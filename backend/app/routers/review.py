# routers/review.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import SessionLocal
from models.review import CourtReview
from models.reservation import Reservation
from schemas.review import CourtReviewCreate, CourtReviewResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/reviews/", response_model=CourtReviewResponse)
def create_review(review: CourtReviewCreate, db: Session = Depends(get_db)):
    existing_review = db.query(CourtReview).filter(
        CourtReview.user_id == review.user_id,
        CourtReview.reservation_id == review.reservation_id
    ).first()
    if existing_review:
        raise HTTPException(status_code=400, detail="Review already exists for this reservation")

    reservation = db.query(Reservation).filter(Reservation.id == review.reservation_id).first()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")

    new_review = CourtReview(**review.dict())
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return new_review