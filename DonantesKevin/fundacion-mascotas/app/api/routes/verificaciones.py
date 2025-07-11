from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import date

from app.config.database import get_db
from app.services.verificacion_service import VerificacionService

router = APIRouter(prefix="/verificaciones", tags=["verificaciones"])

# Schemas Pydantic
class VerificacionCreate(BaseModel):
    donante_id: int
    resultado: str  # Aprobado, Observación, Rechazado
    observaciones: Optional[str] = None

class VerificacionUpdate(BaseModel):
    resultado: Optional[str] = None
    observaciones: Optional[str] = None

class VerificacionResponse(BaseModel):
    id: int
    donante_id: int
    fecha_verificacion: date
    resultado: str
    observaciones: Optional[str]
    
    class Config:
        from_attributes = True

@router.post("/", response_model=VerificacionResponse, status_code=status.HTTP_201_CREATED)
async def crear_verificacion(verificacion: VerificacionCreate, db: Session = Depends(get_db)):
    """Crear una nueva verificación de donante"""
    if verificacion.resultado not in ["Aprobado", "Observación", "Rechazado"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Resultado inválido. Debe ser: Aprobado, Observación o Rechazado"
        )
    
    service = VerificacionService(db)
    
    try:
        return await service.crear_verificacion(verificacion.dict())
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

@router.get("/", response_model=List[VerificacionResponse])
def listar_verificaciones(
    skip: int = 0,
    limit: int = 100,
    resultado: Optional[str] = None,
    donante_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Listar verificaciones con filtros opcionales"""
    service = VerificacionService(db)
    return service.listar_verificaciones(skip=skip, limit=limit, resultado=resultado, donante_id=donante_id)

@router.get("/{verificacion_id}", response_model=VerificacionResponse)
def obtener_verificacion(verificacion_id: int, db: Session = Depends(get_db)):
    """Obtener verificación por ID"""
    service = VerificacionService(db)
    verificacion = service.obtener_verificacion(verificacion_id)
    
    if not verificacion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Verificación no encontrada"
        )
    
    return verificacion

@router.put("/{verificacion_id}", response_model=VerificacionResponse)
async def actualizar_verificacion(
    verificacion_id: int,
    datos: VerificacionUpdate,
    db: Session = Depends(get_db)
):
    """Actualizar verificación existente"""
    service = VerificacionService(db)
    
    # Filtrar solo campos no nulos
    datos_actualizacion = {k: v for k, v in datos.dict().items() if v is not None}
    
    if 'resultado' in datos_actualizacion and datos_actualizacion['resultado'] not in ["Aprobado", "Observación", "Rechazado"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Resultado inválido. Debe ser: Aprobado, Observación o Rechazado"
        )
    
    verificacion = await service.actualizar_verificacion(verificacion_id, datos_actualizacion)
    
    if not verificacion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Verificación no encontrada"
        )
    
    return verificacion

@router.patch("/{verificacion_id}/revisar")
async def revisar_verificacion(
    verificacion_id: int,
    nuevo_resultado: str,
    observaciones: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Revisar y cambiar resultado de verificación"""
    if nuevo_resultado not in ["Aprobado", "Observación", "Rechazado"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Resultado inválido. Debe ser: Aprobado, Observación o Rechazado"
        )
    
    service = VerificacionService(db)
    verificacion = await service.revisar_verificacion(verificacion_id, nuevo_resultado, observaciones)
    
    if not verificacion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Verificación no encontrada"
        )
    
    return {"message": f"Verificación {nuevo_resultado.lower()}", "verificacion": verificacion}

@router.get("/donante/{donante_id}", response_model=List[VerificacionResponse])
def obtener_verificaciones_por_donante(donante_id: int, db: Session = Depends(get_db)):
    """Obtener todas las verificaciones de un donante"""
    service = VerificacionService(db)
    return service.obtener_verificaciones_por_donante(donante_id)

@router.get("/donante/{donante_id}/ultima", response_model=VerificacionResponse)
def obtener_ultima_verificacion(donante_id: int, db: Session = Depends(get_db)):
    """Obtener la verificación más reciente de un donante"""
    service = VerificacionService(db)
    verificacion = service.obtener_ultima_verificacion(donante_id)
    
    if not verificacion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontraron verificaciones para este donante"
        )
    
    return verificacion

@router.get("/estadisticas/resumen")
def obtener_estadisticas_verificaciones(db: Session = Depends(get_db)):
    """Obtener estadísticas de verificaciones"""
    service = VerificacionService(db)
    return service.obtener_estadisticas_verificaciones()
