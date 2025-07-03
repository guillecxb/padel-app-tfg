# app/models/news.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Article(BaseModel):
    title: str
    description: Optional[str]
    url: str
    urlToImage: Optional[str]
    publishedAt: datetime

class NewsResponse(BaseModel):
    status: str
    totalResults: int
    articles: List[Article]