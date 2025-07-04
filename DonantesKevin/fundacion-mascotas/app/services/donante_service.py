from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.models.donante import Donante
from app.websockets.notification_service import NotificationService
from typing import List, Optional
from datetime import date

class DonanteService:
    def __init__(self, db: Session):
        self.db = db
        self.notification_service = NotificationService()
    
    async def crear_donante(self, donante_data: dict) -> Donante:
        """Crear un nuevo donante"""
        donante = Donante(**donante_data)
        self.db.add(donante)
        self.db.commit()
        self.db.refresh(donante)
        
        # Notificación en tiempo real
        await self.notification_service.notify_event({
            "type": "donante_creado",
            "data": {
                "id": donante.id,
                "nombre": donante.nombre,
                "fecha": str(donante.fecha_registro)
            }
        })
        
        return donante
    
    def obtener_donante(self, donante_id: int) -> Optional[Donante]:
        """Obtener donante por ID"""
        return self.db.query(Donante).filter(Donante.id == donante_id).first()
    
    def listar_donantes(self, skip: int = 0, limit: int = 100, estado: str = None) -> List[Donante]:
        """Listar donantes con filtros opcionales"""
        query = self.db.query(Donante)
        
        if estado:
            query = query.filter(Donante.estado == estado)
        
        return query.offset(skip).limit(limit).all()
    
    async def actualizar_donante(self, donante_id: int, datos_actualizacion: dict) -> Optional[Donante]:
        """Actualizar información del donante"""
        donante = self.obtener_donante(donante_id)
        if not donante:
            return None
        
        for key, value in datos_actualizacion.items():
            if hasattr(donante, key):
                setattr(donante, key, value)
        
        self.db.commit()
        self.db.refresh(donante)
        
        # Notificación de actualización
        await self.notification_service.notify_event({
            "type": "donante_actualizado",
            "data": {
                "id": donante.id,
                "nombre": donante.nombre,
                "cambios": list(datos_actualizacion.keys())
            }
        })
        
        return donante
    
    async def cambiar_estado_donante(self, donante_id: int, nuevo_estado: str) -> Optional[Donante]:
        """Cambiar estado del donante (Activo, Inactivo, Suspendido)"""
        donante = self.obtener_donante(donante_id)
        if not donante:
            return None
        
        estado_anterior = donante.estado
        donante.estado = nuevo_estado
        self.db.commit()
        self.db.refresh(donante)
        
        # Notificación de cambio de estado
        await self.notification_service.notify_event({
            "type": "estado_donante_cambiado",
            "data": {
                "id": donante.id,
                "nombre": donante.nombre,
                "estado_anterior": estado_anterior,
                "estado_nuevo": nuevo_estado
            }
        })
        
        return donante
    
    def buscar_donantes(self, termino: str) -> List[Donante]:
        """Buscar donantes por nombre, correo o documento"""
        return self.db.query(Donante).filter(
            and_(
                Donante.nombre.ilike(f"%{termino}%") |
                Donante.correo.ilike(f"%{termino}%") |
                Donante.numero_documento.ilike(f"%{termino}%")
            )
        ).all()
