from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel, EmailStr
from datetime import date

from app.config.database import get_db
from app.services.donante_service import DonanteService
from app.models.donante import Donante

router = APIRouter(prefix="/donantes", tags=["donantes"])

# Schemas Pydantic
class DonanteCreate(BaseModel):
    nombre: str
    correo: EmailStr
    telefono: str
    direccion: Optional[str] = None
    tipo_documento: str
    numero_documento: str

class DonanteUpdate(BaseModel):
    nombre: Optional[str] = None
    correo: Optional[EmailStr] = None
    telefono: Optional[str] = None
    direccion: Optional[str] = None
    tipo_documento: Optional[str] = None
    numero_documento: Optional[str] = None

class DonanteResponse(BaseModel):
    id: int
    nombre: str
    correo: str
    telefono: str
    direccion: Optional[str]
    tipo_documento: str
    numero_documento: str
    fecha_registro: date
    estado: str
    
    class Config:
        from_attributes = True

@router.post("/", response_model=DonanteResponse, status_code=status.HTTP_201_CREATED)
async def crear_donante(donante: DonanteCreate, db: Session = Depends(get_db)):
    """Crear un nuevo donante"""
    service = DonanteService(db)
    
    # Verificar si ya existe el correo o documento
    existing = db.query(Donante).filter(
        (Donante.correo == donante.correo) | 
        (Donante.numero_documento == donante.numero_documento)
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ya existe un donante con ese correo o número de documento"
        )
    
    return await service.crear_donante(donante.dict())

@router.get("/", response_model=List[DonanteResponse])
def listar_donantes(
    skip: int = 0, 
    limit: int = 100, 
    estado: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Listar donantes con filtros opcionales"""
    service = DonanteService(db)
    return service.listar_donantes(skip=skip, limit=limit, estado=estado)

@router.get("/{donante_id}", response_model=DonanteResponse)
def obtener_donante(donante_id: int, db: Session = Depends(get_db)):
    """Obtener donante por ID"""
    service = DonanteService(db)
    donante = service.obtener_donante(donante_id)
    
    if not donante:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Donante no encontrado"
        )
    
    return donante

@router.put("/{donante_id}", response_model=DonanteResponse)
async def actualizar_donante(
    donante_id: int, 
    datos: DonanteUpdate, 
    db: Session = Depends(get_db)
):
    """Actualizar información del donante"""
    service = DonanteService(db)
    
    # Filtrar solo campos no nulos
    datos_actualizacion = {k: v for k, v in datos.dict().items() if v is not None}
    
    donante = await service.actualizar_donante(donante_id, datos_actualizacion)
    
    if not donante:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Donante no encontrado"
        )
    
    return donante

@router.patch("/{donante_id}/estado")
async def cambiar_estado_donante(
    donante_id: int,
    nuevo_estado: str,
    db: Session = Depends(get_db)
):
    """Cambiar estado del donante"""
    if nuevo_estado not in ["Activo", "Inactivo", "Suspendido"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Estado inválido. Debe ser: Activo, Inactivo o Suspendido"
        )
    
    service = DonanteService(db)
    donante = await service.cambiar_estado_donante(donante_id, nuevo_estado)
    
    if not donante:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Donante no encontrado"
        )
    
    return {"message": f"Estado cambiado a {nuevo_estado}", "donante": donante}

@router.get("/buscar/{termino}", response_model=List[DonanteResponse])
def buscar_donantes(termino: str, db: Session = Depends(get_db)):
    """Buscar donantes por nombre, correo o documento"""
    service = DonanteService(db)
    return service.buscar_donantes(termino)
