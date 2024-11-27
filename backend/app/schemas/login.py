from pydantic import BaseModel

# Definición del modelo Pydantic
class LoginSchema(BaseModel):
    name: str
    password: str