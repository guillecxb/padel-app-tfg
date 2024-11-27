# models/user.py
from sqlalchemy import Column, Integer, String, ForeignKey
from db.database import Base
from sqlalchemy.orm import relationship
from .customer import Customer

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, nullable=False)

    # Relación con las reservas
    reservations = relationship("Reservation", back_populates="user")
