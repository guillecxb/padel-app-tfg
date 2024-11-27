# services/weather_service.py
import requests
from datetime import datetime

API_KEY = "b2cb73a6c29c432ebef170053243110"
BASE_URL_CURRENT = "http://api.weatherapi.com/v1/current.json"
BASE_URL_FORECAST = "http://api.weatherapi.com/v1/forecast.json"

def get_weather_for_reservation(latitude: float, longitude: float, reservation_time: datetime):
    """
    Obtiene los datos meteorológicos para una reserva específica.
    """
    # Determina si la reserva es para hoy o una fecha futura
    date_str = reservation_time.strftime("%Y-%m-%d")
    params = {
        "key": API_KEY,
        "q": f"{latitude},{longitude}"
    }
    
    if reservation_time.date() == datetime.today().date():
        # Si la reserva es hoy, consulta el tiempo actual
        url = BASE_URL_CURRENT
    else:
        # Si es para una fecha futura, usa el pronóstico
        url = BASE_URL_FORECAST
        params["dt"] = date_str
        params["days"] = 1

    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()

    if "forecast" in data:
        # Pronóstico por horas para una reserva futura
        forecast_hourly = data["forecast"]["forecastday"][0]["hour"]
        forecast_for_hour = next(
            (hour for hour in forecast_hourly if hour["time"] == reservation_time.strftime("%Y-%m-%d %H:00")), None
        )
        return forecast_for_hour
    else:
        # Tiempo actual para una reserva de hoy
        return data["current"]
