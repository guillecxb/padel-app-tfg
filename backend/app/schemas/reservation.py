# Contiene los modelos de datos que voy a utilizar en la aplicación.
# Pydantic es una libreria de validación y serialización de datos que permite definir los modelos de datos de la aplicación.

# app/models/reservation.py
from pydantic import BaseModel, validator, conint
from typing import Optional
from datetime import datetime

# Definir el validador una vez, fuera de los modelos
@validator('court_id', allow_reuse=True)
def check_court_id(cls, v):
    if v is not None and (v < 1 or v > 12):
        raise ValueError('court_id must be between 1 and 12 or None')
    return v

# clase que define el modelod de datos para una reserva, hereda de BaseModel, lo que permite a Pydantic validar y serializar los datos
class ReservationSchema(BaseModel):
    court_id: int
    start_time: datetime
    end_time: datetime

    # Reutilizar el validador en este modelo
    _check_court_id = check_court_id

    # clase config para añadir metadatos a la definición del modelo, util para la documentación que ofrece FastAPI
    class Config:
        schema_extra = {
            "example": {
                "court_id": 1,
                "start_time": "2024-03-20T09:00:00",
                "end_time": "2024-03-20T10:30:00"
            }
        }

# clase que define el modelo de datos para actualizar una reserva, hereda de BaseModel, todos los campos son opcionales
class UpdateReservationModel(BaseModel):
    court_id: Optional[int] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

    # Reutilizar el validador en este modelo también
    _check_court_id = check_court_id

