from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import date

from app.config.database_sqlite import get_db
from app.services.mascota_service import MascotaService

router = APIRouter(prefix="/mascotas", tags=["mascotas"])

# Schemas
class MascotaDonacionCreate(BaseModel):
    donante_id: int
    mascota_id: int
    motivo_donacion: Optional[str] = None

class MascotaDonacionResponse(BaseModel):
    id: int
    donante_id: int
    mascota_id: int
    fecha_donacion: date
    motivo_donacion: Optional[str]
    estado_revision: str
    
    class Config:
        from_attributes = True

@router.post("/donaciones", response_model=MascotaDonacionResponse, status_code=status.HTTP_201_CREATED)
async def registrar_donacion(donacion: MascotaDonacionCreate, db: Session = Depends(get_db)):
    """Registrar una nueva donación de mascota"""
    service = MascotaService(db)
    return await service.registrar_donacion(donacion.dict())

@router.get("/donaciones", response_model=List[MascotaDonacionResponse])
def listar_donaciones(
    skip: int = 0,
    limit: int = 100,
    estado: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Listar donaciones con filtros"""
    service = MascotaService(db)
    return service.listar_donaciones(skip=skip, limit=limit, estado=estado)

@router.get("/donaciones/{donacion_id}", response_model=MascotaDonacionResponse)
def obtener_donacion(donacion_id: int, db: Session = Depends(get_db)):
    """Obtener donación por ID"""
    service = MascotaService(db)
    donacion = service.obtener_donacion(donacion_id)
    
    if not donacion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Donación no encontrada"
        )
    
    return donacion

@router.patch("/donaciones/{donacion_id}/revisar")
async def revisar_donacion(
    donacion_id: int,
    nuevo_estado: str,
    observaciones: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Revisar y cambiar estado de donación"""
    if nuevo_estado not in ["Pendiente", "Aceptada", "Rechazada"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Estado inválido. Debe ser: Pendiente, Aceptada o Rechazada"
        )
    
    service = MascotaService(db)
    donacion = await service.revisar_donacion(donacion_id, nuevo_estado, observaciones)
    
    if not donacion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Donación no encontrada"
        )
    
    return {"message": f"Donación {nuevo_estado.lower()}", "donacion": donacion}

@router.get("/donaciones/donante/{donante_id}", response_model=List[MascotaDonacionResponse])
def obtener_donaciones_por_donante(donante_id: int, db: Session = Depends(get_db)):
    """Obtener todas las donaciones de un donante"""
    service = MascotaService(db)
    return service.obtener_donaciones_por_donante(donante_id)
