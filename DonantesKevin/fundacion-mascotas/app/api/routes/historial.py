from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import date

from app.config.database_sqlite import get_db
from app.services.historial_service import HistorialService

router = APIRouter(prefix="/historial", tags=["historial"])

# Schemas Pydantic
class HistorialCreate(BaseModel):
    donante_id: int
    tipo_colaboracion: str  # Mascota, Económica, Voluntariado, etc.
    descripcion: Optional[str] = None
    fecha_colaboracion: Optional[date] = None

class HistorialUpdate(BaseModel):
    tipo_colaboracion: Optional[str] = None
    descripcion: Optional[str] = None
    fecha_colaboracion: Optional[date] = None

class HistorialResponse(BaseModel):
    id: int
    donante_id: int
    tipo_colaboracion: str
    descripcion: Optional[str]
    fecha_colaboracion: date
    
    class Config:
        from_attributes = True

@router.post("/", response_model=HistorialResponse, status_code=status.HTTP_201_CREATED)
async def crear_colaboracion(colaboracion: HistorialCreate, db: Session = Depends(get_db)):
    """Registrar una nueva colaboración"""
    service = HistorialService(db)
    
    try:
        return await service.crear_colaboracion(colaboracion.dict())
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

@router.get("/", response_model=List[HistorialResponse])
def listar_colaboraciones(
    skip: int = 0,
    limit: int = 100,
    tipo: Optional[str] = None,
    donante_id: Optional[int] = None,
    fecha_desde: Optional[date] = Query(None, description="Fecha desde (YYYY-MM-DD)"),
    fecha_hasta: Optional[date] = Query(None, description="Fecha hasta (YYYY-MM-DD)"),
    db: Session = Depends(get_db)
):
    """Listar colaboraciones con filtros opcionales"""
    service = HistorialService(db)
    return service.listar_colaboraciones(
        skip=skip, 
        limit=limit, 
        tipo=tipo, 
        donante_id=donante_id,
        fecha_desde=fecha_desde,
        fecha_hasta=fecha_hasta
    )

@router.get("/{colaboracion_id}", response_model=HistorialResponse)
def obtener_colaboracion(colaboracion_id: int, db: Session = Depends(get_db)):
    """Obtener colaboración por ID"""
    service = HistorialService(db)
    colaboracion = service.obtener_colaboracion(colaboracion_id)
    
    if not colaboracion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Colaboración no encontrada"
        )
    
    return colaboracion

@router.put("/{colaboracion_id}", response_model=HistorialResponse)
async def actualizar_colaboracion(
    colaboracion_id: int,
    datos: HistorialUpdate,
    db: Session = Depends(get_db)
):
    """Actualizar información de la colaboración"""
    service = HistorialService(db)
    
    # Filtrar solo campos no nulos
    datos_actualizacion = {k: v for k, v in datos.dict().items() if v is not None}
    
    colaboracion = await service.actualizar_colaboracion(colaboracion_id, datos_actualizacion)
    
    if not colaboracion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Colaboración no encontrada"
        )
    
    return colaboracion

@router.delete("/{colaboracion_id}")
async def eliminar_colaboracion(colaboracion_id: int, db: Session = Depends(get_db)):
    """Eliminar una colaboración del historial"""
    service = HistorialService(db)
    
    if not await service.eliminar_colaboracion(colaboracion_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Colaboración no encontrada"
        )
    
    return {"message": "Colaboración eliminada exitosamente"}

@router.get("/donante/{donante_id}", response_model=List[HistorialResponse])
def obtener_historial_por_donante(donante_id: int, db: Session = Depends(get_db)):
    """Obtener todo el historial de colaboraciones de un donante"""
    service = HistorialService(db)
    return service.obtener_historial_por_donante(donante_id)

@router.get("/tipo/{tipo_colaboracion}", response_model=List[HistorialResponse])
def obtener_colaboraciones_por_tipo(tipo_colaboracion: str, db: Session = Depends(get_db)):
    """Obtener colaboraciones por tipo específico"""
    service = HistorialService(db)
    return service.obtener_colaboraciones_por_tipo(tipo_colaboracion)

@router.get("/recientes/{dias}", response_model=List[HistorialResponse])
def obtener_colaboraciones_recientes(dias: int = 30, db: Session = Depends(get_db)):
    """Obtener colaboraciones de los últimos N días"""
    if dias <= 0 or dias > 365:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El número de días debe estar entre 1 y 365"
        )
    
    service = HistorialService(db)
    return service.obtener_colaboraciones_recientes(dias)

@router.get("/buscar/{termino}", response_model=List[HistorialResponse])
def buscar_colaboraciones(termino: str, db: Session = Depends(get_db)):
    """Buscar colaboraciones por descripción o tipo"""
    service = HistorialService(db)
    return service.buscar_colaboraciones(termino)

@router.get("/estadisticas/completas")
def obtener_estadisticas_colaboraciones(db: Session = Depends(get_db)):
    """Obtener estadísticas completas de colaboraciones"""
    service = HistorialService(db)
    return service.obtener_estadisticas_colaboraciones()

@router.get("/donante/{donante_id}/resumen")
def obtener_resumen_donante(donante_id: int, db: Session = Depends(get_db)):
    """Obtener resumen completo de colaboraciones de un donante"""
    service = HistorialService(db)
    return service.obtener_resumen_donante(donante_id)
