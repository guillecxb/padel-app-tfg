# app/dependencies/auth.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = "SECRET"
ALGORITHM = "HS256"

# dependencia para manejar la autenticación mediante tokens JWT
def jwt_required(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return user_id
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")