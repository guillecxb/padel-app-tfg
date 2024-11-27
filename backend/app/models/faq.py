# models/faq.py
from sqlalchemy import Column, Integer, String
from db.database import Base

class Faq(Base):
    __tablename__ = "faqs"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String, nullable=False)
    answer = Column(String, nullable=False)
