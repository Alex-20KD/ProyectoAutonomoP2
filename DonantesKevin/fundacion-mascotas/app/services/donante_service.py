from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.models.donante import Donante
from app.websockets.notification_service import NotificationService
from app.websockets.central_connector import central_connector
from typing import List, Optional
from datetime import date
import logging

logger = logging.getLogger(__name__)

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
        
        # Notificación local (tu módulo)
        await self.notification_service.notify_event({
            "type": "donante_creado",
            "data": {
                "id": donante.id,
                "nombre": donante.nombre,
                "fecha": str(donante.fecha_registro)
            }
        })
        
        # Notificación al WebSocket Central
        await central_connector.send_event({
            "type": "donante_creado",
            "category": "donante",
            "data": {
                "id": donante.id,
                "nombre": donante.nombre,
                "correo": donante.correo,
                "telefono": donante.telefono,
                "tipo_documento": donante.tipo_documento,
                "numero_documento": donante.numero_documento,
                "estado": donante.estado,
                "fecha_registro": str(donante.fecha_registro)
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
        
        datos_anteriores = {
            "nombre": donante.nombre,
            "correo": donante.correo,
            "telefono": donante.telefono,
            "direccion": donante.direccion
        }
        
        for key, value in datos_actualizacion.items():
            if hasattr(donante, key):
                setattr(donante, key, value)
        
        self.db.commit()
        self.db.refresh(donante)
        
        # Notificación local
        await self.notification_service.notify_event({
            "type": "donante_actualizado",
            "data": {
                "id": donante.id,
                "nombre": donante.nombre,
                "cambios": list(datos_actualizacion.keys())
            }
        })
        
        # Notificación al WebSocket Central
        await central_connector.send_event({
            "type": "donante_actualizado",
            "category": "donante",
            "data": {
                "id": donante.id,
                "nombre": donante.nombre,
                "datos_anteriores": datos_anteriores,
                "datos_nuevos": datos_actualizacion,
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
        
        # Notificación local
        await self.notification_service.notify_event({
            "type": "estado_donante_cambiado",
            "data": {
                "id": donante.id,
                "nombre": donante.nombre,
                "estado_anterior": estado_anterior,
                "estado_nuevo": nuevo_estado
            }
        })
        
        # Notificación al WebSocket Central
        await central_connector.send_event({
            "type": "donante_estado_cambiado",
            "category": "donante",
            "priority": "high",  # Estado es importante para otros módulos
            "data": {
                "id": donante.id,
                "nombre": donante.nombre,
                "correo": donante.correo,
                "estado_anterior": estado_anterior,
                "estado_nuevo": nuevo_estado,
                "motivo": "Cambio manual de estado"
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
