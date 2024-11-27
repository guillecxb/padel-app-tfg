from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql://user:password@db/dbname"

# create_engine crea una conexión a tu base de datos PostgreSQL.
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# SessionLocal es una fábrica de sesiones configurada para usar la conexión.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base es la clase base de SQLAlchemy de la que heredarán todos tus modelos.
Base = declarative_base()
