from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from db.database import SessionLocal
from models.customer import Customer
from models.reservation import Reservation
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

# Esquemas
class CustomerResponse(BaseModel):
    id: int
    name: str
    location: str
    contact_email: str
    phone: str

    class Config:
        orm_mode = True

class CustomerWithCountsResponse(CustomerResponse):
    user_count: int
    reservation_count: int

class PaginatedCustomerWithCountsResponse(BaseModel):
    count: int
    next_link: Optional[str]
    previous_link: Optional[str]
    results: List[CustomerWithCountsResponse]

# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint de clientes con conteos de reservas
@router.get("/customers/", response_model=PaginatedCustomerWithCountsResponse)
def get_customers(request: Request, db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    total_customers = db.query(Customer).count()
    customers = db.query(Customer).offset(skip).limit(limit).all()

    customer_data = []
    for customer in customers:
        reservation_count = db.query(Reservation).filter(Reservation.customer_id == customer.id).count()
        customer_data.append(
            CustomerWithCountsResponse(
                id=customer.id,
                name=customer.name,
                location=customer.location,
                contact_email=customer.contact_email,
                phone=customer.phone,
                user_count=0,  # El valor exacto del conteo de usuarios no se calcula aquí al eliminar la dependencia.
                reservation_count=reservation_count
            )
        )

    next_link = f"{request.url.path}?skip={skip + limit}&limit={limit}" if skip + limit < total_customers else None
    previous_link = f"{request.url.path}?skip={max(0, skip - limit)}&limit={limit}" if skip > 0 else None

    return PaginatedCustomerWithCountsResponse(
        count=total_customers,
        next_link=next_link,
        previous_link=previous_link,
        results=customer_data
    )

@router.get("/customers/{customer_id}/", response_model=CustomerResponse)
def get_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@router.get("/customers/{customer_id}/user_count/", response_model=CustomerWithCountsResponse)
def get_customer_user_count(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    reservation_count = db.query(Reservation).filter(Reservation.customer_id == customer_id).count()
    return CustomerWithCountsResponse(
        id=customer.id,
        name=customer.name,
        location=customer.location,
        contact_email=customer.contact_email,
        phone=customer.phone,
        reservation_count=reservation_count
    )
