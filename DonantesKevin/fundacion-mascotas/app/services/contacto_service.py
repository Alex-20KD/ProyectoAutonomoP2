from sqlalchemy.orm import Session
from app.models.informacion_contacto import InformacionContacto
from app.models.donante import Donante
from app.websockets.notification_service import NotificationService
from app.websockets.central_connector import central_connector
from typing import List, Optional

class ContactoService:
    def __init__(self, db: Session):
        self.db = db
        self.notification_service = NotificationService()
    
    async def crear_contacto(self, contacto_data: dict) -> InformacionContacto:
        """Crear un nuevo contacto de referencia"""
        # Verificar que el donante existe
        donante = self.db.query(Donante).filter(Donante.id == contacto_data['donante_id']).first()
        if not donante:
            raise ValueError("Donante no encontrado")
        
        contacto = InformacionContacto(**contacto_data)
        self.db.add(contacto)
        self.db.commit()
        self.db.refresh(contacto)
        
        # Notificación local
        await self.notification_service.notify_event({
            "type": "contacto_creado",
            "category": "contacto",
            "data": {
                "id": contacto.id,
                "donante_id": contacto.donante_id,
                "donante_nombre": donante.nombre,
                "nombre_contacto": contacto.nombre_contacto,
                "relacion": contacto.relacion
            }
        })
        
        # Notificación al WebSocket Central
        await central_connector.send_event({
            "type": "contacto_referencia_agregado",
            "category": "contacto",
            "data": {
                "id": contacto.id,
                "donante_id": contacto.donante_id,
                "donante_nombre": donante.nombre,
                "donante_correo": donante.correo,
                "contacto_nombre": contacto.nombre_contacto,
                "contacto_telefono": contacto.telefono,
                "relacion": contacto.relacion
            }
        })
        
        return contacto
    
    def obtener_contacto(self, contacto_id: int) -> Optional[InformacionContacto]:
        """Obtener contacto por ID"""
        return self.db.query(InformacionContacto).filter(InformacionContacto.id == contacto_id).first()
    
    def listar_contactos(self, skip: int = 0, limit: int = 100, donante_id: int = None, relacion: str = None) -> List[InformacionContacto]:
        """Listar contactos con filtros opcionales"""
        query = self.db.query(InformacionContacto)
        
        if donante_id:
            query = query.filter(InformacionContacto.donante_id == donante_id)
        
        if relacion:
            query = query.filter(InformacionContacto.relacion.ilike(f"%{relacion}%"))
        
        return query.offset(skip).limit(limit).all()
    
    async def actualizar_contacto(self, contacto_id: int, datos_actualizacion: dict) -> Optional[InformacionContacto]:
        """Actualizar información del contacto"""
        contacto = self.obtener_contacto(contacto_id)
        if not contacto:
            return None
        
        for key, value in datos_actualizacion.items():
            if hasattr(contacto, key):
                setattr(contacto, key, value)
        
        self.db.commit()
        self.db.refresh(contacto)
        
        # Notificación local
        donante = self.db.query(Donante).filter(Donante.id == contacto.donante_id).first()
        await self.notification_service.notify_event({
            "type": "contacto_actualizado",
            "category": "contacto",
            "data": {
                "id": contacto.id,
                "donante_id": contacto.donante_id,
                "donante_nombre": donante.nombre if donante else "Desconocido",
                "nombre_contacto": contacto.nombre_contacto,
                "cambios": list(datos_actualizacion.keys())
            }
        })
        
        # Notificación al WebSocket Central
        await central_connector.send_event({
            "type": "contacto_referencia_actualizado",
            "category": "contacto",
            "data": {
                "id": contacto.id,
                "donante_id": contacto.donante_id,
                "donante_nombre": donante.nombre if donante else "Desconocido",
                "contacto_nombre": contacto.nombre_contacto,
                "cambios": list(datos_actualizacion.keys())
            }
        })
        
        return contacto
    
    async def eliminar_contacto(self, contacto_id: int) -> bool:
        """Eliminar contacto de referencia"""
        contacto = self.obtener_contacto(contacto_id)
        if not contacto:
            return False
        
        # Obtener datos para notificación antes de eliminar
        donante = self.db.query(Donante).filter(Donante.id == contacto.donante_id).first()
        contacto_data = {
            "id": contacto.id,
            "donante_id": contacto.donante_id,
            "donante_nombre": donante.nombre if donante else "Desconocido",
            "nombre_contacto": contacto.nombre_contacto,
            "relacion": contacto.relacion
        }
        
        self.db.delete(contacto)
        self.db.commit()
        
        # Notificación local
        await self.notification_service.notify_event({
            "type": "contacto_eliminado",
            "category": "contacto",
            "data": contacto_data
        })
        
        # Notificación al WebSocket Central
        await central_connector.send_event({
            "type": "contacto_referencia_eliminado",
            "category": "contacto",
            "data": contacto_data
        })
        
        return True
    
    def obtener_contactos_por_donante(self, donante_id: int) -> List[InformacionContacto]:
        """Obtener todos los contactos de un donante específico"""
        return self.db.query(InformacionContacto).filter(InformacionContacto.donante_id == donante_id).all()
    
    def buscar_contactos(self, termino: str) -> List[InformacionContacto]:
        """Buscar contactos por nombre o teléfono"""
        return self.db.query(InformacionContacto).filter(
            InformacionContacto.nombre_contacto.ilike(f"%{termino}%") |
            InformacionContacto.telefono.ilike(f"%{termino}%")
        ).all()
    
    def obtener_contactos_por_relacion(self, relacion: str) -> List[InformacionContacto]:
        """Obtener contactos por tipo de relación"""
        return self.db.query(InformacionContacto).filter(InformacionContacto.relacion.ilike(f"%{relacion}%")).all()
    
    def validar_contacto_duplicado(self, donante_id: int, telefono: str) -> bool:
        """Verificar si ya existe un contacto con el mismo teléfono para el donante"""
        existing = self.db.query(InformacionContacto).filter(
            InformacionContacto.donante_id == donante_id,
            InformacionContacto.telefono == telefono
        ).first()
        return existing is not None
    
    def obtener_estadisticas_contactos(self) -> dict:
        """Obtener estadísticas de contactos"""
        total = self.db.query(InformacionContacto).count()
        
        # Contar por tipo de relación
        relaciones = self.db.query(InformacionContacto.relacion).distinct().all()
        estadisticas_relaciones = {}
        
        for (relacion,) in relaciones:
            count = self.db.query(InformacionContacto).filter(InformacionContacto.relacion == relacion).count()
            estadisticas_relaciones[relacion] = count
        
        # Donantes con más contactos
        donantes_con_contactos = self.db.query(InformacionContacto.donante_id).distinct().count()
        
        return {
            "total_contactos": total,
            "donantes_con_contactos": donantes_con_contactos,
            "promedio_contactos_por_donante": round(total / donantes_con_contactos if donantes_con_contactos > 0 else 0, 2),
            "por_relacion": estadisticas_relaciones
        }
