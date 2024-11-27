# models/customer.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from db.database import Base

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    location = Column(String)
    contact_email = Column(String)
    phone = Column(String)
    
    # Relaciones
    courts = relationship("Court", back_populates="customer")
