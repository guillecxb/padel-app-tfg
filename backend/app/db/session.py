# Este archivo gestiona la creación y configuración de la sesión de SQLAlchemy. 
# La sesión es el objeto a través del cual manejas todas las operaciones de la base de datos como consultas y transacciones.

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .base_class import Base

# Configuración de la URL de la base de datos
DATABASE_URL = "postgresql://user:password@localhost/dbname"

engine = create_engine(DATABASE_URL, echo=True)  # 'echo=True' para loguear las consultas realizadas

# Creación del objeto SessionLocal, que es una fábrica de sesiones
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    import your_application.models as models  # Importa todos tus modelos aquí
    Base.metadata.create_all(bind=engine)  # Crea todas las tablas en la base de datos
