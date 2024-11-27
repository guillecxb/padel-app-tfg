from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import SessionLocal
from models.faq import Faq
from typing import List
from pydantic import BaseModel

router = APIRouter()

# Definir el esquema para la respuesta de FAQ
class FaqResponse(BaseModel):
    id: int
    question: str
    answer: str

    class Config:
        orm_mode = True

# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/faqs/", response_model=List[FaqResponse])
def get_faqs(db: Session = Depends(get_db)):
    """
    Obtener todas las preguntas frecuentes (FAQs).
    """
    faqs = db.query(Faq).all()
    return faqs
