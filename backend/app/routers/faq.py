from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.faq import Faq
from typing import List
from schemas.faq import FaqResponse # Importar el modelo de respuesta
from dependencies.database import get_db # Dependencia para obtener la sesión de la base de datos

router = APIRouter()


@router.get("/faqs/", response_model=List[FaqResponse])
def get_faqs(db: Session = Depends(get_db)):
    """
    Obtener todas las preguntas frecuentes (FAQs).
    """
    faqs = db.query(Faq).all()
    return faqs
