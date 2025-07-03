# app/models/reservation.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from schemas.review import CourtReviewResponse


class ReservationCreate(BaseModel):
    user_id: int
    customer_id: int  # Ahora el customer_id se pasa explícitamente
    court_id: int
    reservation_time: datetime

class WeatherInfo(BaseModel):
    temp_c: Optional[float]
    condition_text: Optional[str]
    wind_kph: Optional[float]
    humidity: Optional[int]

class ReservationResponse(BaseModel):
    id: int
    user_id: int
    court_id: int
    reservation_time: datetime
    customer_id: int
    weather: Optional[WeatherInfo] = None

    class Config:
        orm_mode = True

class CourtAvailabilityResponse(BaseModel):
    court_id: int
    court_name: str
    available: bool
    average_rating: Optional[float] = None
    review_count: int
    reviews: List[CourtReviewResponse] = []  # 🆕 reviews detalladas

    class Config:
        orm_mode = True

class ReservationCountByCourtResponse(BaseModel):
    court_id: int
    court_name: str
    reservation_count: int

    class Config:
        orm_mode = True


class ReviewOut(BaseModel):
    id: int
    user_id: int
    rating: int
    comment: Optional[str]
    class Config:
        orm_mode = True