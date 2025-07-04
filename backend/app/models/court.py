# models/court.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base

class Court(Base):
    __tablename__ = "courts"

    court_id = Column(Integer, primary_key=True, index=True)  # Identificador único de la pista
    name = Column(String, index=True)  # Nombre de pista que será un número del 1 al 8
    location = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)

    customer_id = Column(Integer, ForeignKey("customers.id"))
    customer = relationship("Customer", back_populates="courts")
    reservations = relationship("Reservation", back_populates="court")
    reviews = relationship("CourtReview", back_populates="court")
