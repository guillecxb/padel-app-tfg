# from fastapi import HTTPException, Depends
# from fastapi_jwt_auth import AuthJWT

# def require_role(role: str, Authorize: AuthJWT = Depends()):
#     # Verifica que el usuario esté autenticado
#     Authorize.jwt_required()

#     # Obtiene los claims del JWT, incluyendo el rol
#     claims = Authorize.get_raw_jwt()
#     user_role = claims.get("role")

#     # Comprueba si el rol del usuario es el requerido
#     if user_role != role:
#         raise HTTPException(status_code=403, detail=f"Access forbidden: {role} role required")

from fastapi import HTTPException, Depends
from fastapi_jwt_auth import AuthJWT

def require_role(role: str, Authorize: AuthJWT = Depends()):
    # Verifica que el usuario esté autenticado
    Authorize.jwt_required()

    # Obtiene los claims del JWT, incluyendo el rol
    claims = Authorize.get_raw_jwt()
    user_role = claims.get("role")

    # Comprueba si el rol del usuario es el requerido
    if user_role != role:
        # Incluye los claims en el mensaje de error
        raise HTTPException(
            status_code=403,
            detail={
                "message": f"Access forbidden: {role} role required",
                "claims": claims  # Agrega todos los claims al detalle
            }
        )
