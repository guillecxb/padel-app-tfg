import asyncio
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from db.database import SessionLocal
from models.reservation import Reservation
from models.user import User
from models.court import Court
from models.customer import Customer
from services.email_service import send_reminder_email, send_thank_you_email
from services.weather_service import get_weather_for_reservation

# ✅ Función que busca reservas próximas y envía recordatorios
async def check_and_send_reminders():
    db: Session = SessionLocal()
    now = datetime.utcnow()
    reminder_time = now + timedelta(hours=24)

    reservations = db.query(Reservation).filter(
        Reservation.reservation_time >= now,
        Reservation.reservation_time <= reminder_time
    ).all()

    for reservation in reservations:
        user = db.query(User).filter(User.id == reservation.user_id).first()
        court = db.query(Court).filter(Court.court_id == reservation.court_id).first()
        customer = db.query(Customer).filter(Customer.id == reservation.customer_id).first()

        if user and court and customer:
            print(f"📅 Enviando recordatorio a {user.email} para la pista {court.name}")

            # Obtener nueva previsión del tiempo
            new_weather = get_weather_for_reservation(
                court.latitude, court.longitude, reservation.reservation_time
            )

            if new_weather:
                changes = []

                # Comprobamos diferencias significativas
                if reservation.weather_temp_c is not None and abs(reservation.weather_temp_c - new_weather.get("temp_c", 0)) > 1:
                    changes.append(f"- Temperatura: antes {reservation.weather_temp_c}°C, ahora {new_weather['temp_c']}°C")

                if reservation.weather_condition_text and reservation.weather_condition_text != new_weather.get("condition", {}).get("text"):
                    changes.append(f"- Condición: antes '{reservation.weather_condition_text}', ahora '{new_weather['condition']['text']}'")

                if reservation.weather_wind_kph is not None and abs(reservation.weather_wind_kph - new_weather.get("wind_kph", 0)) > 5:
                    changes.append(f"- Viento: antes {reservation.weather_wind_kph} km/h, ahora {new_weather['wind_kph']} km/h")

                if reservation.weather_humidity is not None and abs(reservation.weather_humidity - new_weather.get("humidity", 0)) > 10:
                    changes.append(f"- Humedad: antes {reservation.weather_humidity}%, ahora {new_weather['humidity']}%")

                if changes:
                    weather_message = "⚠️ La previsión meteorológica ha cambiado desde que hiciste la reserva:\n" + "\n".join(changes)
                else:
                    weather_message = (
                        "✅ Las condiciones meteorológicas se mantienen similares a cuando reservaste:\n"
                        f"- Condición: {reservation.weather_condition_text}\n"
                        f"- Temperatura: {reservation.weather_temp_c}°C\n"
                        f"- Viento: {reservation.weather_wind_kph} km/h\n"
                        f"- Humedad: {reservation.weather_humidity}%"
                    )
            else:
                weather_message = "⚠️ No se pudo obtener la previsión del tiempo para comprobar si hubo cambios."

            await send_reminder_email(
                user.email,
                court.name,
                customer.name,
                reservation.reservation_time.strftime("%d/%m/%Y %H:%M"),
                weather_message=weather_message
            )


    db.close()


async def check_and_send_review_requests():
    db: Session = SessionLocal()
    now = datetime.utcnow()
    grace_period = timedelta(minutes=15)  # por si tarda en terminar la reserva
    review_window_start = now - timedelta(minutes=90 + 15)
    review_window_end = now - grace_period

    past_reservations = db.query(Reservation).filter(
        Reservation.reservation_time >= review_window_start,
        Reservation.reservation_time <= review_window_end
    ).all()

    for reservation in past_reservations:
        user = db.query(User).filter(User.id == reservation.user_id).first()
        court = db.query(Court).filter(Court.court_id == reservation.court_id).first()
        customer = db.query(Customer).filter(Customer.id == reservation.customer_id).first()

        if user and court and customer:
            print(f"📩 Enviando email de review a {user.email} por la pista {court.name}")
            review_link = f"http://localhost:3000/members-area/review?reservation_id={reservation.id}&court_id={court.court_id}"

            await send_thank_you_email(
                user.email,
                user.name,
                court.name,
                customer.name,
                reservation.reservation_time.strftime("%d/%m/%Y %H:%M"),
                review_link
            )
    db.close()

# ✅ Loop asincrónico para ejecutar la tarea cada hora
async def reminder_scheduler():
    while True:
        print("⏳ Comprobando reservas para enviar recordatorios...")
        await check_and_send_reminders()
        await check_and_send_review_requests()
        print("✅ Comprobación finalizada. Esperando 1 hora...")
        await asyncio.sleep(120)  # Puedes dejarlo en 120 para pruebas
