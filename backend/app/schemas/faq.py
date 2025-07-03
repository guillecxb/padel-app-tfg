# app/models/faq.py
from pydantic import BaseModel

# Definir el esquema para la respuesta de FAQ
class FaqResponse(BaseModel):
    id: int
    question: str
    answer: str

    class Config:
        orm_mode = True