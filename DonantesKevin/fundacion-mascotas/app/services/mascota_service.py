from sqlalchemy.orm import Session
from app.models.mascota_donada import MascotaDonada
from app.models.donante import Donante
from app.websockets.notification_service import NotificationService
from app.websockets.central_connector import central_connector
from typing import List, Optional

class MascotaService:
    def __init__(self, db: Session):
        self.db = db
        self.notification_service = NotificationService()
    
    async def registrar_donacion(self, donacion_data: dict) -> MascotaDonada:
        """Registrar una nueva donación de mascota"""
        donacion = MascotaDonada(**donacion_data)
        self.db.add(donacion)
        self.db.commit()
        self.db.refresh(donacion)
        
        # Obtener datos del donante
        donante = self.db.query(Donante).filter(Donante.id == donacion.donante_id).first()
        
        # Notificación local
        await self.notification_service.notify_event({
            "type": "donacion_registrada",
            "data": {
                "id": donacion.id,
                "donante_id": donacion.donante_id,
                "mascota_id": donacion.mascota_id,
                "fecha": str(donacion.fecha_donacion),
                "estado": donacion.estado_revision
            }
        })
        
        # Notificación al WebSocket Central
        await central_connector.send_event({
            "type": "mascota_donada",
            "category": "donacion",
            "priority": "high",  # Las donaciones son importantes para otros módulos
            "data": {
                "id": donacion.id,
                "donante_id": donacion.donante_id,
                "donante_nombre": donante.nombre if donante else "Desconocido",
                "donante_correo": donante.correo if donante else None,
                "mascota_id": donacion.mascota_id,
                "motivo_donacion": donacion.motivo_donacion,
                "estado_revision": donacion.estado_revision,
                "fecha_donacion": str(donacion.fecha_donacion)
            }
        })
        
        return donacion
    
    def obtener_donacion(self, donacion_id: int) -> Optional[MascotaDonada]:
        """Obtener donación por ID"""
        return self.db.query(MascotaDonada).filter(MascotaDonada.id == donacion_id).first()
    
    def listar_donaciones(self, skip: int = 0, limit: int = 100, estado: str = None) -> List[MascotaDonada]:
        """Listar donaciones con filtros"""
        query = self.db.query(MascotaDonada)
        
        if estado:
            query = query.filter(MascotaDonada.estado_revision == estado)
        
        return query.offset(skip).limit(limit).all()
    
    async def revisar_donacion(self, donacion_id: int, nuevo_estado: str, observaciones: str = None) -> Optional[MascotaDonada]:
        """Revisar y cambiar estado de donación"""
        donacion = self.obtener_donacion(donacion_id)
        if not donacion:
            return None
        
        estado_anterior = donacion.estado_revision
        donacion.estado_revision = nuevo_estado
        
        if observaciones:
            donacion.motivo_donacion += f"\n\nObservaciones de revisión: {observaciones}"
        
        self.db.commit()
        self.db.refresh(donacion)
        
        # Obtener datos del donante
        donante = self.db.query(Donante).filter(Donante.id == donacion.donante_id).first()
        
        # Notificación local
        await self.notification_service.notify_event({
            "type": "donacion_revisada",
            "data": {
                "id": donacion.id,
                "donante_id": donacion.donante_id,
                "estado_anterior": estado_anterior,
                "estado_nuevo": nuevo_estado,
                "observaciones": observaciones
            }
        })
        
        # Notificación al WebSocket Central
        await central_connector.send_event({
            "type": "donacion_revisada",
            "category": "donacion",
            "priority": "high",
            "data": {
                "id": donacion.id,
                "donante_id": donacion.donante_id,
                "donante_nombre": donante.nombre if donante else "Desconocido",
                "mascota_id": donacion.mascota_id,
                "estado_anterior": estado_anterior,
                "estado_nuevo": nuevo_estado,
                "observaciones": observaciones,
                "fecha_revision": str(donacion.fecha_donacion)
            }
        })
        
        return donacion
    
    def obtener_donaciones_por_donante(self, donante_id: int) -> List[MascotaDonada]:
        """Obtener todas las donaciones de un donante específico"""
        return self.db.query(MascotaDonada).filter(MascotaDonada.donante_id == donante_id).all()
