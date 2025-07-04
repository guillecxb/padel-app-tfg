from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

# Configuración de FastAPI-Mail
conf = ConnectionConfig(
    MAIL_USERNAME="padelapptfg@gmail.com",
    MAIL_PASSWORD="bdyybvfzsuevzwlc",
    MAIL_FROM="padelapptfg@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True
)

# Función para enviar el email con información de la reserva
async def send_email(to_email: str, court_name: str, club_name: str, reservation_time: str):
    email_body = f"""
    Hola,

    Tu reserva ha sido confirmada con éxito.

    📍 **Club:** {club_name}
    🎾 **Pista:** {court_name}
    ⏰ **Fecha y hora:** {reservation_time}

    ¡Nos vemos en la pista!

    Equipo del Club de Pádel
    """

    message = MessageSchema(
        subject="✅ Confirmación de tu reserva",
        recipients=[to_email],
        body=email_body,
        subtype="plain"
    )

    fm = FastMail(conf)
    await fm.send_message(message)
    print(f"Email enviado correctamente a {to_email}")


# ✅ Función para enviar el email de recordatorio
async def send_reminder_email(to_email: str, court_name: str, club_name: str, reservation_time: str, weather_message: str):
    email_body = f"""
    ⏰ **Recordatorio de tu reserva**

    📍 **Club:** {club_name}
    🎾 **Pista:** {court_name}
    ⏰ **Fecha y hora:** {reservation_time}

    {weather_message.strip()}

    No olvides tu cita. ¡Te esperamos en la pista!

    Equipo del Club de Pádel
    """

    message = MessageSchema(
        subject="📅 Recordatorio: Tu reserva de pádel",
        recipients=[to_email],
        body=email_body,
        subtype="plain"
    )

    fm = FastMail(conf)
    await fm.send_message(message)
    print(f"📩 Recordatorio enviado a {to_email}")


# ✅ Función para enviar email de agradecimiento + link a la review
async def send_thank_you_email(to_email: str, user_name: str, court_name: str, club_name: str, reservation_time: str, review_link: str):
    email_body = f"""
    ¡Hola {user_name}!

    Esperamos que hayas disfrutado tu reserva en el club **{club_name}**.

    🎾 **Pista:** {court_name}  
    📅 **Fecha y hora:** {reservation_time}

    Nos encantaría conocer tu opinión sobre la pista.  
    👉 Puedes dejar tu valoración aquí: {review_link}

    ¡Gracias por ayudarnos a mejorar!

    Equipo del Club de Pádel
    """

    message = MessageSchema(
        subject="🎾 ¿Qué te pareció tu reserva?",
        recipients=[to_email],
        body=email_body,
        subtype="plain"
    )

    fm = FastMail(conf)
    await fm.send_message(message)
    print(f"✅ Email de agradecimiento y review enviado a {to_email}")

