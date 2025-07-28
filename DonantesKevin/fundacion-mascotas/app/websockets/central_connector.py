import asyncio
import websockets
import json
import logging
import sys
import os

logger = logging.getLogger(__name__)

class CentralWebSocketConnector:
    def __init__(self, module_name: str = "donantes"):
        self.module_name = module_name
        self.websocket = None
        self.connected = False
        # URL del WebSocket Central (ajustar según entorno)
        self.central_url = os.getenv("WEBSOCKET_CENTRAL_URL", "ws://localhost:8002")
    
    async def connect(self):
        """Conectar al WebSocket central"""
        try:
            # Construir URL completa para módulos
            full_url = f"{self.central_url}/modules/{self.module_name}"
            logger.info(f"🔌 Intentando conectar a: {full_url}")
            
            self.websocket = await websockets.connect(full_url)
            self.connected = True
            logger.info(f"✅ Módulo {self.module_name} conectado al WebSocket Central")
            
            # Enviar mensaje de registro
            await self.websocket.send(json.dumps({
                "type": "module_registered",
                "module": self.module_name,
                "status": "connected"
            }))
            
        except Exception as e:
            logger.error(f"❌ Error conectando al WebSocket Central: {e}")
            logger.error(f"   URL intentada: {self.central_url}")
            self.connected = False
    
    async def send_event(self, event_data: dict):
        """Enviar evento al WebSocket Central"""
        # Si no está conectado, intentar conectar
        if not self.connected or not self.websocket:
            logger.info("🔄 Reconectando al WebSocket Central...")
            await self.connect()
        
        # Si aún no está conectado, registrar warning y salir
        if not self.connected:
            logger.warning("⚠️ No se pudo conectar al WebSocket Central, evento no enviado")
            logger.warning(f"   Evento perdido: {event_data.get('type', 'unknown')}")
            return
        
        try:
            # Preparar mensaje con metadatos
            message = {
                **event_data,
                "module": self.module_name,
                "source": "donantes_service",
                "timestamp": asyncio.get_event_loop().time()
            }
            
            await self.websocket.send(json.dumps(message))
            logger.info(f"📤 Evento enviado al WebSocket Central: {event_data.get('type', 'unknown')}")
            
        except websockets.exceptions.ConnectionClosed:
            logger.error("🔌 Conexión WebSocket cerrada, marcando como desconectado")
            self.connected = False
        except Exception as e:
            logger.error(f"❌ Error enviando evento al WebSocket Central: {e}")
            self.connected = False
    
    async def disconnect(self):
        """Desconectar del WebSocket Central"""
        if self.websocket:
            try:
                # Enviar mensaje de desconexión
                await self.websocket.send(json.dumps({
                    "type": "module_disconnecting",
                    "module": self.module_name
                }))
                await self.websocket.close()
            except:
                pass  # Ignorar errores al desconectar
            
            self.connected = False
            logger.info(f"🔌 Módulo {self.module_name} desconectado del WebSocket Central")
    
    def is_connected(self) -> bool:
        """Verificar si está conectado"""
        return self.connected and self.websocket is not None
    
    async def ping(self):
        """Enviar ping para mantener conexión viva"""
        if self.is_connected():
            try:
                await self.websocket.send(json.dumps({
                    "type": "ping",
                    "module": self.module_name
                }))
            except Exception as e:
                logger.error(f"Error en ping: {e}")
                self.connected = False

# Instancia global para el módulo de donantes
central_connector = CentralWebSocketConnector("donantes")

# Función helper para inicializar la conexión
async def initialize_central_connection():
    """Función helper para inicializar la conexión al WebSocket Central"""
    logger.info("🚀 Inicializando conexión al WebSocket Central...")
    await central_connector.connect()
    return central_connector.is_connected()

# Función helper para verificar conexión
def is_central_connected() -> bool:
    """Verificar si el WebSocket Central está conectado"""
    return central_connector.is_connected()
