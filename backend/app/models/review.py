# models/review.py
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from db.database import Base

class CourtReview(Base):
    __tablename__ = "court_reviews"

    id = Column(Integer, primary_key=True, index=True)
    court_id = Column(Integer, ForeignKey("courts.court_id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    reservation_id = Column(Integer, ForeignKey("reservations.id"))

    rating = Column(Integer)  # 1 to 5
    comment = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    court = relationship("Court", back_populates="reviews")
    user = relationship("User")
    reservation = relationship("Reservation")