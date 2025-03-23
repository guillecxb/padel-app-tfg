import asyncio
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from fastapi_mail import FastMail, MessageSchema
from db.database import SessionLocal
from models.reservation import Reservation
from models.user import User
from models.court import Court
from models.customer import Customer
from services.email_service import send_reminder_email

# ✅ Función que busca reservas próximas y envía recordatorios
async def check_and_send_reminders():
    db: Session = SessionLocal()
    now = datetime.utcnow()
    reminder_time = now + timedelta(hours=24)

    reservations = db.query(Reservation).filter(
        Reservation.reservation_time >= now,
        Reservation.reservation_time <= reminder_time
    ).all()

    for reservation in reservations:
        user = db.query(User).filter(User.id == reservation.user_id).first()
        court = db.query(Court).filter(Court.court_id == reservation.court_id).first()
        customer = db.query(Customer).filter(Customer.id == reservation.customer_id).first()

        if user and court and customer:
            print(f"📅 Enviando recordatorio a {user.email} para la pista {court.name}")
            await send_reminder_email(
                user.email,
                court.name,
                customer.name,
                reservation.reservation_time.strftime("%d/%m/%Y %H:%M")
            )

    db.close()

# ✅ Loop asincrónico para ejecutar la tarea cada hora
async def reminder_scheduler():
    while True:
        print("⏳ Comprobando reservas para enviar recordatorios...")
        print(f"Intentando enviar recordatorio")
        await check_and_send_reminders()
        print("✅ Comprobación finalizada. Esperando 1 hora...")
        await asyncio.sleep(120) 

