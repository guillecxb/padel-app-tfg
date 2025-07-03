# weather.py
from fastapi import APIRouter, HTTPException
from datetime import datetime
from typing import Optional
from services.weather_service import get_weather_for_reservation
from schemas.weather import WeatherResponse, WeatherRequest

router = APIRouter()

@router.post("/weather/", response_model=WeatherResponse)
def get_weather_info(weather_request: WeatherRequest):
    """
    Endpoint para obtener el clima de una ubicación específica (latitud y longitud).
    Si se proporciona una fecha, devuelve el pronóstico para esa fecha; si no, devuelve el clima actual.
    """
    try:
        # Determina si se debe consultar el clima actual o un pronóstico
        target_date = weather_request.date if weather_request.date else datetime.now()

        # Llama al servicio de clima con la fecha apropiada
        weather_data = get_weather_for_reservation(
            weather_request.latitude,
            weather_request.longitude,
            target_date
        )

        # Si no se encuentra el clima, lanza una excepción
        if not weather_data:
            raise HTTPException(status_code=404, detail="Weather data not available for this location and date")

        # Devuelve el clima en el formato esperado
        return WeatherResponse(
            temp_c=weather_data["temp_c"],
            condition_text=weather_data["condition"]["text"],
            wind_kph=weather_data["wind_kph"],
            humidity=weather_data["humidity"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
