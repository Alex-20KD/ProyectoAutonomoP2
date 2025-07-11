from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel

from app.config.database import get_db
from app.services.contacto_service import ContactoService

router = APIRouter(prefix="/contactos", tags=["contactos"])

# Schemas Pydantic
class ContactoCreate(BaseModel):
    donante_id: int
    nombre_contacto: str
    telefono: str
    relacion: str

class ContactoUpdate(BaseModel):
    nombre_contacto: Optional[str] = None
    telefono: Optional[str] = None
    relacion: Optional[str] = None

class ContactoResponse(BaseModel):
    id: int
    donante_id: int
    nombre_contacto: str
    telefono: str
    relacion: str
    
    class Config:
        from_attributes = True

@router.post("/", response_model=ContactoResponse, status_code=status.HTTP_201_CREATED)
async def crear_contacto(contacto: ContactoCreate, db: Session = Depends(get_db)):
    """Crear un nuevo contacto de referencia"""
    service = ContactoService(db)
    
    # Verificar si ya existe un contacto con el mismo teléfono para el donante
    if service.validar_contacto_duplicado(contacto.donante_id, contacto.telefono):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ya existe un contacto con ese teléfono para este donante"
        )
    
    try:
        return await service.crear_contacto(contacto.dict())
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

@router.get("/", response_model=List[ContactoResponse])
def listar_contactos(
    skip: int = 0,
    limit: int = 100,
    donante_id: Optional[int] = None,
    relacion: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Listar contactos con filtros opcionales"""
    service = ContactoService(db)
    return service.listar_contactos(skip=skip, limit=limit, donante_id=donante_id, relacion=relacion)

@router.get("/{contacto_id}", response_model=ContactoResponse)
def obtener_contacto(contacto_id: int, db: Session = Depends(get_db)):
    """Obtener contacto por ID"""
    service = ContactoService(db)
    contacto = service.obtener_contacto(contacto_id)
    
    if not contacto:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contacto no encontrado"
        )
    
    return contacto

@router.put("/{contacto_id}", response_model=ContactoResponse)
async def actualizar_contacto(
    contacto_id: int,
    datos: ContactoUpdate,
    db: Session = Depends(get_db)
):
    """Actualizar información del contacto"""
    service = ContactoService(db)
    
    # Filtrar solo campos no nulos
    datos_actualizacion = {k: v for k, v in datos.dict().items() if v is not None}
    
    contacto = await service.actualizar_contacto(contacto_id, datos_actualizacion)
    
    if not contacto:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contacto no encontrado"
        )
    
    return contacto

@router.delete("/{contacto_id}")
async def eliminar_contacto(contacto_id: int, db: Session = Depends(get_db)):
    """Eliminar contacto de referencia"""
    service = ContactoService(db)
    
    if not await service.eliminar_contacto(contacto_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contacto no encontrado"
        )
    
    return {"message": "Contacto eliminado exitosamente"}

@router.get("/donante/{donante_id}", response_model=List[ContactoResponse])
def obtener_contactos_por_donante(donante_id: int, db: Session = Depends(get_db)):
    """Obtener todos los contactos de un donante"""
    service = ContactoService(db)
    return service.obtener_contactos_por_donante(donante_id)

@router.get("/buscar/{termino}", response_model=List[ContactoResponse])
def buscar_contactos(termino: str, db: Session = Depends(get_db)):
    """Buscar contactos por nombre o teléfono"""
    service = ContactoService(db)
    return service.buscar_contactos(termino)

@router.get("/relacion/{relacion}", response_model=List[ContactoResponse])
def obtener_contactos_por_relacion(relacion: str, db: Session = Depends(get_db)):
    """Obtener contactos por tipo de relación"""
    service = ContactoService(db)
    return service.obtener_contactos_por_relacion(relacion)

@router.get("/estadisticas/resumen")
def obtener_estadisticas_contactos(db: Session = Depends(get_db)):
    """Obtener estadísticas de contactos"""
    service = ContactoService(db)
    return service.obtener_estadisticas_contactos()
