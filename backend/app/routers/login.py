from fastapi import APIRouter, Depends, Form, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_jwt_auth import AuthJWT
from fastapi import Request
from datetime import timedelta
from pydantic import BaseSettings
from sqlalchemy.orm import Session
from fastapi_jwt_auth.exceptions import JWTDecodeError
from typing import List
from db.database import SessionLocal
from models.user import User
from schemas.user import UserResponseSchema, UserCreateSchema, UserListResponseSchema, UserResponseSchema2, UserUpdateSchema
import logging 
from services.auth_utils import require_role
from sqlalchemy import func, and_
from datetime import datetime
from models.reservation import Reservation
from zoneinfo import ZoneInfo

router = APIRouter()

class Settings(BaseSettings):
    authjwt_secret_key: str = "TU_CLAVE_SECRETA_AQUI"

@AuthJWT.load_config
def get_config():
    return Settings()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post('/login')
def login(name: str = Form(...), password: str = Form(...), db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):

    # Busca al usuario en la base de datos
    user = db.query(User).filter(User.name == name).first()
    if not user or user.password != password:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # Añade el rol del usuario al token como un claim adicional
    access_token = Authorize.create_access_token(
        subject=user.id,
        expires_time=timedelta(hours=8),
        user_claims={"role": user.role}  # Agrega el rol aquí
    )
    refresh_token = Authorize.create_refresh_token(subject=user.id)

    return {"access": access_token, "refresh": refresh_token}


# @router.post('/refresh')
# async def refresh(request: Request, Authorize: AuthJWT = Depends()):
#     try:
#         # Obtener el cuerpo de la solicitud y extraer el refresh token
#         data = await request.json()
#         refresh_token = data.get("refresh")

#         if not refresh_token:
#             raise HTTPException(status_code=400, detail="Refresh token is required")

#         # Asignar el token manualmente a AuthJWT
#         Authorize._token = refresh_token

#         # Validar el token de refresco
#         Authorize.jwt_refresh_token_required()
#     except JWTDecodeError:
#         # Devolver un error 401 si el token es inválido o ha expirado
#         raise HTTPException(status_code=401, detail="Invalid or expired refresh token")
#     except Exception as e:
#         # Capturar cualquier otro error y registrar el problema
#         logging.error(f"Error processing refresh token: {str(e)}")
#         raise HTTPException(status_code=500, detail="Internal server error")

#     # Obtener el ID del usuario autenticado desde el token de refresco
#     current_user = Authorize.get_jwt_subject()

#     # Crear un nuevo access token con un tiempo de expiración de 8 horas
#     new_access_token = Authorize.create_access_token(subject=current_user, expires_time=timedelta(hours=8))

#     return {"access": new_access_token}


@router.post('/refresh')
async def refresh(request: Request, db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    try:
        # Obtener el cuerpo de la solicitud y extraer el refresh token
        data = await request.json()
        refresh_token = data.get("refresh")

        if not refresh_token:
            raise HTTPException(status_code=400, detail="Refresh token is required")

        # Asignar el token manualmente a AuthJWT
        Authorize._token = refresh_token

        # Validar el token de refresco
        Authorize.jwt_refresh_token_required()
    except JWTDecodeError:
        # Devolver un error 401 si el token es inválido o ha expirado
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")
    except Exception as e:
        # Capturar cualquier otro error y registrar el problema
        logging.error(f"Error processing refresh token: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

    # Obtener el ID del usuario autenticado desde el token de refresco
    current_user_id = Authorize.get_jwt_subject()

    # Obtener el usuario desde la base de datos
    user = db.query(User).filter(User.id == current_user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Crear un nuevo access token con los mismos claims que el login
    new_access_token = Authorize.create_access_token(
        subject=current_user_id,
        expires_time=timedelta(hours=8),
        user_claims={"role": user.role}  # Incluye los claims del usuario
    )

    return {"access": new_access_token}


@router.get('/auth/me')
def auth_me(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_user = Authorize.get_jwt_subject()
    return {"message": "Token válido", "user": current_user}


@router.post('/user', response_model=UserResponseSchema)
def create_user(user: UserCreateSchema, db: Session = Depends(get_db)):
    # db_user = User(name=user.name, password=user.password)
    db_user = User(name=user.name, password=user.password, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.get('/user/{user_id}')
def get_user(user_id: str, db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    try:
        # Requiere que el usuario esté autenticado
        Authorize.jwt_required()
    except Exception:
        # Devuelve un 401 si el token es inválido o no está presente
        raise HTTPException(status_code=401, detail="Not authenticated")

    # Obtén el ID del usuario autenticado
    current_user_id = Authorize.get_jwt_subject()

    # Si el user_id es "me", reemplázalo por el ID del usuario autenticado
    if user_id == "me":
        user_id = current_user_id

    # Obtén el usuario solicitado de la base de datos
    user = db.query(User).filter(User.id == int(user_id)).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "ob_id": 1,
        "service_vendor_id": None,
        "language": "en",
        "external_credentials": None,
        "last_login": "2024-08-10T13:27:15.795450+00:00",
        "oid": None
    }

@router.delete('/user/{user_id}')
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    Authorize: AuthJWT = Depends()
):
    # Requiere que el usuario esté autenticado
    Authorize.jwt_required()

    # Obtén el ID del usuario autenticado
    current_user_id = Authorize.get_jwt_subject()

    # Obtén el usuario autenticado de la base de datos
    current_user = db.query(User).filter(User.id == int(current_user_id)).first()

    # Verifica que el usuario autenticado tiene el rol de "operator"
    if current_user.role != "operator":
        raise HTTPException(status_code=403, detail="Only operators can delete users")

    # Obtén el usuario que se va a eliminar de la base de datos
    user_to_delete = db.query(User).filter(User.id == user_id).first()

    if not user_to_delete:
        raise HTTPException(status_code=404, detail="User not found")

    # Verifica que el usuario a eliminar no sea un operador
    if user_to_delete.role == "operator":
        raise HTTPException(status_code=403, detail="Cannot delete an operator user")

    # Elimina el usuario
    db.delete(user_to_delete)
    db.commit()

    return {"message": "User deleted successfully"}



@router.get('/me')
def get_me(Authorize: AuthJWT = Depends()):
    # Requerir que el usuario esté autenticado
    Authorize.jwt_required()

    # Puedes obtener el usuario actual desde el token si es necesario
    current_user = Authorize.get_jwt_subject()

    # Retornar el JSON estático o dinámico si es necesario
    {
        "id":1,
        "name":"superadmin",
        "role":"operator",
    }

    return {
        "id": 20,
        "name": "customer_fnl",
        "role": "customer",
        "ob_id": 1,
        "service_vendor_id": None,
        "language": "en",
        "external_credentials": None,
        "last_login": "2024-08-10T13:27:15.795450+00:00",
        "oid": None
    }

# Endpointde prueba protegido para operadores
@router.get('/protected-endpoint')
def protected_endpoint(Authorize: AuthJWT = Depends()):
    # Requiere que el usuario esté autenticado
    Authorize.jwt_required()

    # Obtiene los claims del JWT, incluyendo el rol
    claims = Authorize.get_raw_jwt()
    user_role = claims["role"]

    # Verifica el rol del usuario
    if user_role != "operator":
        raise HTTPException(status_code=403, detail="Access forbidden: Admins only")

    return {"message": "Welcome, admin!"}

@router.get('/admin-only-endpoint')
def admin_only_endpoint(Authorize: AuthJWT = Depends()):
    # Llama a la función require_role con el rol "admin"
    require_role("operator", Authorize)

    # Código del endpoint solo accesible para administradores
    return {"message": "Access granted: Welcome, admin!"}


@router.get('/users', response_model=UserListResponseSchema)
def get_users(db: Session = Depends(get_db)):
    # Obtiene la lista de usuarios con el conteo de reservas activas
    users = db.query(
        User.id,
        User.name,
        User.email,
        User.role,
        func.count(Reservation.id).label("active_reservations")
    ).outerjoin(Reservation, and_(
        Reservation.user_id == User.id,
        Reservation.reservation_time > datetime.now(ZoneInfo("Europe/Madrid")) # Considera solo reservas futuras
    )).group_by(User.id).all()

    # Convierte los resultados en el formato esperado por el esquema `UserListResponseSchema`
    results = [
        UserResponseSchema2(
            id=user.id,
            name=user.name,
            email=user.email,
            role=user.role,
            active_reservations=user.active_reservations
        )
        for user in users
    ]

    return UserListResponseSchema(
        count=len(results),
        results=results
    )


@router.put('/user/{user_id}', response_model=UserResponseSchema2)
def update_user(
    user_id: int,
    user_update: UserUpdateSchema,
    db: Session = Depends(get_db),
    Authorize: AuthJWT = Depends()
):
    # Requiere que el usuario esté autenticado
    Authorize.jwt_required()

    # Obtiene el ID del usuario autenticado
    current_user_id = int(Authorize.get_jwt_subject())

    # Obtiene el usuario autenticado de la base de datos
    current_user = db.query(User).filter(User.id == current_user_id).first()

    # Verifica permisos: el usuario puede editar si es el mismo, un "operator", o el "superadmin" con ID 1
    if current_user_id != user_id and current_user.role != "operator" and current_user_id != 1:
        raise HTTPException(status_code=403, detail="You do not have permission to edit this user")

    # Obtiene el usuario a actualizar de la base de datos
    user_to_update = db.query(User).filter(User.id == user_id).first()
    if not user_to_update:
        raise HTTPException(status_code=404, detail="User not found")

    # Actualiza los campos si se proporcionaron en la solicitud
    if user_update.name is not None:
        user_to_update.name = user_update.name
    if user_update.password is not None:
        user_to_update.password = user_update.password
    if user_update.email is not None:
        user_to_update.email = user_update.email

    db.commit()
    db.refresh(user_to_update)

    # Devuelve la respuesta con el esquema `UserResponseSchema2`
    return UserResponseSchema2(
        id=user_to_update.id,
        name=user_to_update.name,
        email=user_to_update.email,
        role=user_to_update.role,
        active_reservations=db.query(func.count(Reservation.id))
                              .filter(Reservation.user_id == user_to_update.id,
                                      Reservation.reservation_time > datetime.now(ZoneInfo("Europe/Madrid")))
                              .scalar()
    )


@router.post('/user/create', response_model=UserResponseSchema2)
def create_user_test(
    user: UserCreateSchema,
    db: Session = Depends(get_db),
    Authorize: AuthJWT = Depends()
):
    # Llama a la función require_role con el rol "admin"
    require_role("operator", Authorize)
    
    # Muestra el contenido recibido en los logs
    print("Datos recibidos:", user.dict())

    # Crea el nuevo usuario con el rol especificado
    db_user = User(name=user.name, password=user.password, role=user.role, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Retorna los datos recibidos, incluyendo un campo ficticio para active_reservations
    return UserResponseSchema2(
        id=0,  # ID ficticio ya que no estamos interactuando con la base de datos
        name=user.name,
        email=user.email,
        role=user.role,
        active_reservations=0  # Ficticio para cumplir con el esquema
    )

