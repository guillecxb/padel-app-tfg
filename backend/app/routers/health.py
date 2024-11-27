from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/health")
def health_check():
    # Aquí podrías agregar más comprobaciones si es necesario, como verificar la conexión a la base de datos.
    return {"status": "ok"}
