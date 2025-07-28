"""
Servicio WebSocket Central para todos los módulos
"""

import asyncio
import websockets
import json
import logging
from typing import Dict, Set
from datetime import datetime

logger = logging.getLogger(__name__)

class CentralWebSocketService:
    def __init__(self):
        self.clients: Set[websockets.WebSocketServerProtocol] = set()
        self.modules: Dict[str, websockets.WebSocketServerProtocol] = {}
    
    async def register_client(self, websocket, path):
        """Registrar cliente (frontend, admin, etc.)"""
        self.clients.add(websocket)
        logger.info(f"Cliente conectado. Total: {len(self.clients)}")
        
        try:
            await websocket.send(json.dumps({
                "type": "connection_established",
                "message": "Conectado al sistema central",
                "timestamp": datetime.now().isoformat()
            }))
            
            async for message in websocket:
                await self.handle_client_message(websocket, json.loads(message))
                
        except websockets.exceptions.ConnectionClosed:
            pass
        finally:
            self.clients.remove(websocket)
            logger.info(f"Cliente desconectado. Total: {len(self.clients)}")
    
    async def register_module(self, websocket, path):
        """Registrar módulo (donantes, mascotas, etc.)"""
        module_name = path.split('/')[-1]  # /modules/donantes -> donantes
        self.modules[module_name] = websocket
        logger.info(f"Módulo {module_name} conectado")
        
        try:
            async for message in websocket:
                event_data = json.loads(message)
                # Reenviar evento a todos los clientes
                await self.broadcast_to_clients({
                    **event_data,
                    "source_module": module_name,
                    "timestamp": datetime.now().isoformat()
                })
                
        except websockets.exceptions.ConnectionClosed:
            pass
        finally:
            if module_name in self.modules:
                del self.modules[module_name]
            logger.info(f"Módulo {module_name} desconectado")
    
    async def handle_client_message(self, websocket, data):
        """Manejar mensajes de clientes"""
        message_type = data.get("type")
        
        if message_type == "ping":
            await websocket.send(json.dumps({"type": "pong"}))
        elif message_type == "get_modules":
            await websocket.send(json.dumps({
                "type": "modules_status",
                "modules": list(self.modules.keys()),
                "total_clients": len(self.clients)
            }))
    
    async def broadcast_to_clients(self, message):
        """Enviar mensaje a todos los clientes conectados"""
        if self.clients:
            await asyncio.gather(
                *[client.send(json.dumps(message)) for client in self.clients],
                return_exceptions=True
            )

# Instancia global
central_service = CentralWebSocketService()

async def main():
    """Iniciar servidor WebSocket central"""
    # Puerto 8001: Clientes (frontend, admin)
    clients_server = await websockets.serve(
        central_service.register_client, 
        "localhost", 
        8001
    )
    
    # Puerto 8002: Módulos (donantes, mascotas, etc.)
    modules_server = await websockets.serve(
        central_service.register_module, 
        "localhost", 
        8002
    )
    
    logger.info("🚀 Servidor WebSocket Central iniciado:")
    logger.info("   - Clientes: ws://localhost:8001")
    logger.info("   - Módulos: ws://localhost:8002")
    
    await asyncio.gather(
        clients_server.wait_closed(),
        modules_server.wait_closed()
    )

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    asyncio.run(main())
