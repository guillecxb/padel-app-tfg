from fastapi import APIRouter, HTTPException, Query
import requests
from schemas.news import Article, NewsResponse

# Clave API para NewsAPI (cambia esto por tu clave real)
NEWS_API_KEY = "3bee137238484939bb63024c0c69d01a"

# Definir el router
router = APIRouter()


@router.get("/news/", response_model=NewsResponse)
def get_padel_news(
    q: str = Query("premier padel", description="El término de búsqueda para las noticias"),
    from_date: str = Query(..., description="Fecha de inicio en formato YYYY-MM-DD"),
    sortBy: str = Query("popularity", description="Orden de las noticias")
):
    """
    Endpoint para obtener noticias sobre padel utilizando la API de NewsAPI.
    """
    url = "https://newsapi.org/v2/everything"
    params = {
        "q": q,
        "from": from_date,
        "sortBy": sortBy,
        "apiKey": NEWS_API_KEY
    }
    
    response = requests.get(url, params=params)
    
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error al obtener las noticias")
    
    return response.json()
