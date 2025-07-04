
# schemas/review.py
from pydantic import BaseModel, conint
from typing import Optional
from datetime import datetime

class CourtReviewCreate(BaseModel):
    court_id: int
    user_id: int
    reservation_id: int
    rating: conint(ge=1, le=5)
    comment: Optional[str] = None

class CourtReviewResponse(BaseModel):
    id: int
    court_id: int
    user_id: int
    reservation_id: int
    rating: int
    comment: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True