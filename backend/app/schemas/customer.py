# app/models/customer.py
from pydantic import BaseModel
from typing import List, Optional

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
