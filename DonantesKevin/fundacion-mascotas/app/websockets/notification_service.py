import asyncio
import json
import logging
from datetime import datetime
from typing import Dict, Any
from .connection_manager import connection_manager

logger = logging.getLogger(__name__)

class NotificationService:
    def __init__(self):
        self.connection_manager = connection_manager
    
    async def notify_event(self, event_data: Dict[str, Any]):
        """Notificar un evento a todos los clientes conectados"""
        try:
            # Agregar timestamp al evento
            event_data["timestamp"] = datetime.now().isoformat()
            
            # Log del evento
            logger.info(f"Notificando evento: {event_data['type']}")
            
            # Broadcast a todos los clientes
            await self.connection_manager.broadcast(event_data)
            
        except Exception as e:
            logger.error(f"Error notificando evento: {e}")
    
    async def notify_donante_events(self, event_type: str, donante_data: Dict[str, Any]):
        """Notificaciones específicas para eventos de donantes"""
        event_data = {
            "type": f"donante_{event_type}",
            "category": "donante",
            "data": donante_data,
            "timestamp": datetime.now().isoformat()
        }
        
        await self.connection_manager.broadcast(event_data)
    
    async def notify_mascota_events(self, event_type: str, mascota_data: Dict[str, Any]):
        """Notificaciones específicas para eventos de mascotas"""
        event_data = {
            "type": f"mascota_{event_type}",
            "category": "mascota",
            "data": mascota_data,
            "timestamp": datetime.now().isoformat()
        }
        
        await self.connection_manager.broadcast(event_data)
    
    async def notify_verificacion_events(self, event_type: str, verificacion_data: Dict[str, Any]):
        """Notificaciones específicas para eventos de verificación"""
        event_data = {
            "type": f"verificacion_{event_type}",
            "category": "verificacion",
            "data": verificacion_data,
            "timestamp": datetime.now().isoformat()
        }
        
        await self.connection_manager.broadcast(event_data)
    
    async def send_system_notification(self, message: str, level: str = "info"):
        """Enviar notificación del sistema"""
        event_data = {
            "type": "system_notification",
            "category": "system",
            "data": {
                "message": message,
                "level": level
            },
            "timestamp": datetime.now().isoformat()
        }
        
        await self.connection_manager.broadcast(event_data)
    
    def get_connection_stats(self) -> Dict[str, Any]:
        """Obtener estadísticas de conexiones"""
        return {
            "active_connections": self.connection_manager.get_connection_count(),
            "clients_info": self.connection_manager.get_clients_info(),
            "timestamp": datetime.now().isoformat()
        }

# Instancia global del servicio
notification_service = NotificationService()
