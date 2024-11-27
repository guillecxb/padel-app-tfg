# models/reservation.py
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from db.database import Base

class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    court_id = Column(Integer, ForeignKey("courts.court_id"))
    reservation_time = Column(DateTime, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"))  # Nuevo campo

    user = relationship("User", back_populates="reservations")
    court = relationship("Court", back_populates="reservations")
    customer = relationship("Customer")  # Relación con el modelo Customer
