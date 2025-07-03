# app/models/weather.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class WeatherRequest(BaseModel):
    latitude: float
    longitude: float
    date: Optional[datetime] = None  # 'date' es ahora opcional

class WeatherResponse(BaseModel):
    temp_c: float
    condition_text: str
    wind_kph: float
    humidity: int