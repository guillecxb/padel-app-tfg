from fastapi import APIRouter, Depends, HTTPException, Query, BackgroundTasks
from sqlalchemy.orm import Session
from sqlalchemy import and_, func
from services.weather_service import get_weather_for_reservation
from models.reservation import Reservation
from models.user import User
from models.court import Court
from models.customer import Customer
from datetime import datetime, timedelta
from typing import List, Optional
from services.email_service import send_email
from models.review import CourtReview
from schemas.reservation import ReservationResponse, ReservationCreate, WeatherInfo, CourtAvailabilityResponse, ReservationCountByCourtResponse


from dependencies.database import get_db # Dependencia para obtener la sesión de la base de datos


router = APIRouter()




def check_reservation_availability(db: Session, court_id: int, start_time: datetime, end_time: datetime) -> bool:
    overlapping_reservations = db.query(Reservation).filter(
        and_(
            Reservation.court_id == court_id,
            Reservation.reservation_time < end_time,
            (Reservation.reservation_time + timedelta(hours=1, minutes=30)) > start_time
        )
    ).all()
    return len(overlapping_reservations) == 0

@router.post("/reservations/", response_model=ReservationResponse)
def create_reservation(background_tasks: BackgroundTasks, reservation: ReservationCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == reservation.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    customer_id = reservation.customer_id
    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer (club) not found")

    court = db.query(Court).filter(Court.court_id == reservation.court_id).first()
    if not court:
        raise HTTPException(status_code=404, detail="Court not found")
    if court.customer_id != customer_id:
        raise HTTPException(status_code=400, detail="Court does not belong to the specified customer's club.")

    start_time = reservation.reservation_time
    end_time = start_time + timedelta(hours=1, minutes=30)

    if start_time.hour < 9 or (start_time.hour == 22 and start_time.minute > 30) or start_time.hour >= 23:
        raise HTTPException(status_code=400, detail="Reservations can only be made between 9 AM and 12 AM, with the last slot starting at 10:30 PM.")

    if not check_reservation_availability(db, reservation.court_id, start_time, end_time):
        raise HTTPException(status_code=400, detail="The court is already reserved for the selected time slot.")
    
    # Obtener la previsión del tiempo
    weather_data = get_weather_for_reservation(
        court.latitude, court.longitude, reservation.reservation_time
    )

    print(f"🌦️ Weather data: {weather_data}")

    # Inicializar variables por si falla la API
    temp_c = condition_text = wind_kph = humidity = None

    if weather_data:
        temp_c = weather_data.get("temp_c")
        condition_text = weather_data.get("condition", {}).get("text")
        wind_kph = weather_data.get("wind_kph")
        humidity = weather_data.get("humidity")


    db_reservation = Reservation(
        user_id=reservation.user_id,
        court_id=reservation.court_id,
        reservation_time=reservation.reservation_time,
        customer_id=customer_id,
        weather_temp_c=temp_c,
        weather_condition_text=condition_text,
        weather_wind_kph=wind_kph,
        weather_humidity=humidity
    )
    db.add(db_reservation)
    db.commit()
    db.refresh(db_reservation)

    background_tasks.add_task(
        send_email,
        user.email,
        court.name,
        customer.name,
        reservation.reservation_time.strftime("%d/%m/%Y %H:%M")
    )

    return db_reservation

@router.get("/users/{user_id}/reservations/", response_model=List[ReservationResponse])
def get_user_reservations(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    reservations = db.query(Reservation).filter(Reservation.user_id == user_id).all()
    reservation_responses = []
    for reservation in reservations:
        court = db.query(Court).filter(Court.court_id == reservation.court_id).first()
        if not court:
            raise HTTPException(status_code=404, detail="Court not found")

        try:
            weather_data = get_weather_for_reservation(
                court.latitude, court.longitude, reservation.reservation_time
            )
            weather_info = WeatherInfo(
                temp_c=weather_data.get("temp_c"),
                condition_text=weather_data.get("condition", {}).get("text"),
                wind_kph=weather_data.get("wind_kph"),
                humidity=weather_data.get("humidity")
            ) if weather_data else None
        except Exception:
            weather_info = None

        reservation_responses.append(
            ReservationResponse(
                id=reservation.id,
                user_id=reservation.user_id,
                court_id=reservation.court_id,
                reservation_time=reservation.reservation_time,
                customer_id=reservation.customer_id,
                weather=weather_info
            )
        )
    return reservation_responses

@router.delete("/reservations/{reservation_id}/", response_model=ReservationResponse)
def delete_reservation(reservation_id: int, db: Session = Depends(get_db)):
    reservation = db.query(Reservation).filter(Reservation.id == reservation_id).first()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    
    db.delete(reservation)
    db.commit()
    return reservation

@router.get("/customers/{customer_id}/available-courts/", response_model=List[CourtAvailabilityResponse])
def get_available_courts(customer_id: int, date: datetime, db: Session = Depends(get_db)):
    start_time = date
    end_time = start_time + timedelta(hours=1, minutes=30)

    courts = db.query(Court).filter(Court.customer_id == customer_id).all()
    if not courts:
        raise HTTPException(status_code=404, detail="No courts found for the specified customer")

    court_ids = [court.court_id for court in courts]
    reviews_by_court = (
        db.query(CourtReview)
        .filter(CourtReview.court_id.in_(court_ids))
        .all()
    )


    reviews_map = {}
    for review in reviews_by_court:
        reviews_map.setdefault(review.court_id, []).append(review)

    available_courts = []
    for court in courts:
        is_available = check_reservation_availability(db, court.court_id, start_time, end_time)
        court_reviews = reviews_map.get(court.court_id, [])

        if court_reviews:
            avg_rating = sum(r.rating for r in court_reviews) / len(court_reviews)
        else:
            avg_rating = None

        available_courts.append(CourtAvailabilityResponse(
            court_id=court.court_id,
            court_name=court.name,
            available=is_available,
            average_rating=avg_rating,
            review_count=len(court_reviews),
            reviews=court_reviews
        ))

    return available_courts

@router.get("/customers/{customer_id}/reservations/", response_model=List[ReservationResponse])
def get_customer_reservations(customer_id: int, db: Session = Depends(get_db)):
    reservations = db.query(Reservation).filter(Reservation.customer_id == customer_id).all()
    if not reservations:
        raise HTTPException(status_code=404, detail="No reservations found for the specified customer")

    return reservations


@router.get("/customers/{customer_id}/reservations-by-date/", response_model=List[ReservationResponse])
def get_customer_reservations_by_date(
    customer_id: int,
    from_date: Optional[datetime] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Reservation).filter(Reservation.customer_id == customer_id)
    if from_date:
        query = query.filter(Reservation.reservation_time >= from_date)
    reservations = query.all()
    if not reservations:
        raise HTTPException(status_code=404, detail="No reservations found for the specified customer and date")
    return reservations

@router.get("/customers/{customer_id}/reservations/count-by-court/", response_model=List[ReservationCountByCourtResponse])
def get_reservation_count_by_court(customer_id: int, db: Session = Depends(get_db)):
    counts = db.query(
        Reservation.court_id,
        func.count(Reservation.id).label('reservation_count')
    ).filter(
        Reservation.customer_id == customer_id
    ).group_by(
        Reservation.court_id
    ).all()

    if not counts:
        raise HTTPException(status_code=404, detail="No reservations found for the specified customer")

    response = []
    for court_id, reservation_count in counts:
        court = db.query(Court).filter(Court.court_id == court_id).first()
        court_name = court.name if court else "Unknown Court"
        response.append(ReservationCountByCourtResponse(
            court_id=court_id,
            court_name=court_name,
            reservation_count=reservation_count
        ))
    return response
