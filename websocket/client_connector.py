import asyncio
import websockets
import json
import logging

logger = logging.getLogger(__name__)

class ModuleWebSocketConnector:
    def __init__(self, module_name: str = "donantes"):
        self.module_name = module_name
        self.websocket = None
        self.connected = False
    
    async def connect(self):
        """Conectar al WebSocket central"""
        try:
            self.websocket = await websockets.connect(f"ws://localhost:8002/modules/{self.module_name}")
            self.connected = True
            logger.info(f"Módulo {self.module_name} conectado al WebSocket central")
        except Exception as e:
            logger.error(f"Error conectando al WebSocket central: {e}")
            self.connected = False
    
    async def send_event(self, event_data: dict):
        """Enviar evento al WebSocket central"""
        if not self.connected or not self.websocket:
            await self.connect()
        
        try:
            await self.websocket.send(json.dumps({
                **event_data,
                "module": self.module_name
            }))
        except Exception as e:
            logger.error(f"Error enviando evento: {e}")
            self.connected = False
    
    async def disconnect(self):
        """Desconectar del WebSocket central"""
        if self.websocket:
            await self.websocket.close()
            self.connected = False

# Instancia global para tu módulo
module_connector = ModuleWebSocketConnector("donantes")
