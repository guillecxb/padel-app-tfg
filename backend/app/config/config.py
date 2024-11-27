# config.py
from pydantic import BaseSettings

class Settings(BaseSettings):
    authjwt_secret_key: str = "TU_CLAVE_SECRETA_AQUI"
    # authjwt_algorithm: str = "HS256"
    # Puedes añadir más configuraciones de JWT aquí

settings = Settings()
