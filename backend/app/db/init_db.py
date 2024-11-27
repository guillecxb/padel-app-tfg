# Este archivo podría ser utilizado para inicializar la base de datos con datos de prueba o para configurar cualquier lógica necesaria al iniciar la aplicación por primera vez. 
# Puede ser especialmente útil durante el desarrollo o si tu aplicación necesita una configuración inicial específica como cargar datos por defecto.
from sqlalchemy.orm import Session
from .session import SessionLocal, init_db
from .models import User, Reservation  # Asegúrate de importar tus modelos aquí

def create_initial_data():
    db = SessionLocal()
    try:
        # Crear y añadir datos de prueba
        user1 = User(name='superadmin', password='1234')
        db.add(user1)
        db.commit()

    finally:
        db.close()

if __name__ == "__main__":
    init_db()
    create_initial_data()
