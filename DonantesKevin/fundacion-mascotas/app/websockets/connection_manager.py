from typing import List, Dict
import websockets
import json
import asyncio
import logging

logger = logging.getLogger(__name__)

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[websockets.WebSocketServerProtocol] = []
        self.client_info: Dict[websockets.WebSocketServerProtocol, dict] = {}
    
    async def connect(self, websocket: websockets.WebSocketServerProtocol, client_info: dict = None):
        """Conectar un nuevo cliente WebSocket"""
        await websocket.accept() if hasattr(websocket, 'accept') else None
        self.active_connections.append(websocket)
        
        if client_info:
            self.client_info[websocket] = client_info
        
        logger.info(f"Cliente conectado. Total conexiones: {len(self.active_connections)}")
        
        # Enviar mensaje de bienvenida
        await self.send_personal_message({
            "type": "connection_established",
            "message": "Conectado al servicio de notificaciones",
            "timestamp": str(asyncio.get_event_loop().time())
        }, websocket)
    
    def disconnect(self, websocket: websockets.WebSocketServerProtocol):
        """Desconectar cliente WebSocket"""
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        
        if websocket in self.client_info:
            del self.client_info[websocket]
        
        logger.info(f"Cliente desconectado. Total conexiones: {len(self.active_connections)}")
    
    async def send_personal_message(self, message: dict, websocket: websockets.WebSocketServerProtocol):
        """Enviar mensaje a un cliente específico"""
        try:
            if websocket in self.active_connections:
                await websocket.send(json.dumps(message))
        except websockets.exceptions.ConnectionClosed:
            self.disconnect(websocket)
        except Exception as e:
            logger.error(f"Error enviando mensaje personal: {e}")
            self.disconnect(websocket)
    
    async def broadcast(self, message: dict):
        """Enviar mensaje a todos los clientes conectados"""
        if not self.active_connections:
            logger.info("No hay clientes conectados para broadcast")
            return
        
        disconnected_clients = []
        
        for connection in self.active_connections:
            try:
                await connection.send(json.dumps(message))
            except websockets.exceptions.ConnectionClosed:
                disconnected_clients.append(connection)
            except Exception as e:
                logger.error(f"Error en broadcast: {e}")
                disconnected_clients.append(connection)
        
        # Limpiar conexiones cerradas
        for client in disconnected_clients:
            self.disconnect(client)
    
    async def broadcast_to_group(self, message: dict, group: str):
        """Enviar mensaje a un grupo específico de clientes"""
        target_clients = [
            conn for conn, info in self.client_info.items() 
            if info.get('group') == group
        ]
        
        disconnected_clients = []
        
        for connection in target_clients:
            try:
                await connection.send(json.dumps(message))
            except websockets.exceptions.ConnectionClosed:
                disconnected_clients.append(connection)
            except Exception as e:
                logger.error(f"Error en broadcast grupal: {e}")
                disconnected_clients.append(connection)
        
        # Limpiar conexiones cerradas
        for client in disconnected_clients:
            self.disconnect(client)
    
    def get_connection_count(self) -> int:
        """Obtener número de conexiones activas"""
        return len(self.active_connections)
    
    def get_clients_info(self) -> List[dict]:
        """Obtener información de todos los clientes conectados"""
        return list(self.client_info.values())

# Instancia global del manager
connection_manager = ConnectionManager()
