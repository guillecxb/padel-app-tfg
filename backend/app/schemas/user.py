from pydantic import BaseModel
from typing import List, Optional

class UserResponseSchema(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


# class UserCreateSchema(BaseModel):
#     name: str
#     password: str

class UserCreateSchema(BaseModel):
    name: str
    password: str
    email: str
    role: str

    class Config:
        orm_mode = True

class UserResponseSchema2(BaseModel):
    id: int
    name: str
    email: str
    role: str
    active_reservations: int

    class Config:
        orm_mode = True

class UserListResponseSchema(BaseModel):
    count: int
    results: List[UserResponseSchema2]

class UserUpdateSchema(BaseModel):
    name: Optional[str] = None
    password: Optional[str] = None
    email: Optional[str] = None

    class Config:
        orm_mode = True
