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
async def send_reminder_email(to_email: str, court_name: str, club_name: str, reservation_time: str):
    email_body = f"""
    Hola,

    ⏰ **Recordatorio de tu reserva**

    📍 **Club:** {club_name}
    🎾 **Pista:** {court_name}
    ⏰ **Fecha y hora:** {reservation_time}

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
