from fastapi import FastAPI
from db.database import engine, Base  # utilizado para interactuar con la base de datos
from routers import reservation, login, customer, health, news, faq, weather, review
from fastapi.middleware.cors import CORSMiddleware
from models.user import User  # Asegúrate de importar los modelos
# from initialize_db import create_initial_user, create_initial_courts
from initialize_db import create_initial_data
from services.scheduler import reminder_scheduler  # Importamos el scheduler
import asyncio


app = FastAPI()

# Configurar los orígenes permitidos
origins = [
    "http://localhost:8081",
    "http://127.0.0.1:8081",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Habilita CORS para todas las rutas y métodos
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Orígenes permitidos
    allow_credentials=True,  # Si usas cookies o autenticación
    allow_methods=["*"],  # Métodos permitidos (GET, POST, etc.)
    allow_headers=["*"],  # Cabeceras permitidas
)

# EVENTOS = fastApi permite definir funciones que se ejecuten cuando ocurren ciertos eventos, como el inicio o el cierre de la aplicación.
# Startup se ejecuta al inicio de la aplicación
# Crea todas las tablas definidas en los modelos base, si no existen
@app.on_event("startup")
async def create_tables():
    Base.metadata.create_all(bind=engine)  # Crea las tablas definidas en los modelos
    create_initial_data()
    print("Servidor iniciado. Lanzando el recordatorio en segundo plano...")
    asyncio.create_task(reminder_scheduler())


app.include_router(login.router, tags=["login"])
app.include_router(reservation.router, tags=["reservation"])
app.include_router(customer.router, tags=["customer"])
app.include_router(health.router, tags=["health"])
app.include_router(news.router, tags=["news"])
app.include_router(faq.router, tags=["FAQs"])
app.include_router(weather.router, tags=["weather"])
app.include_router(review.router, tags=["review"])
