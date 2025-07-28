import websockets
import json
import asyncio
import logging
from .connection_manager import connection_manager
from app.config.settings_sqlite import settings

logger = logging.getLogger(__name__)

async def handle_websocket_connection(websocket, path):
    """Manejar conexiones WebSocket entrantes"""
    client_info = {
        "connected_at": asyncio.get_event_loop().time(),
        "path": path,
        "remote_address": websocket.remote_address[0] if websocket.remote_address else "unknown"
    }
    
    try:
        # Registrar conexión
        await connection_manager.connect(websocket, client_info)
        
        # Escuchar mensajes del cliente
        async for message in websocket:
            try:
                data = json.loads(message)
                await handle_client_message(websocket, data)
            except json.JSONDecodeError:
                await connection_manager.send_personal_message({
                    "type": "error",
                    "message": "Formato de mensaje inválido"
                }, websocket)
            except Exception as e:
                logger.error(f"Error procesando mensaje: {e}")
                await connection_manager.send_personal_message({
                    "type": "error", 
                    "message": "Error procesando mensaje"
                }, websocket)
                
    except websockets.exceptions.ConnectionClosed:
        logger.info("Cliente desconectado normalmente")
    except Exception as e:
        logger.error(f"Error en conexión WebSocket: {e}")
    finally:
        connection_manager.disconnect(websocket)

async def handle_client_message(websocket, data):
    """Procesar mensajes del cliente"""
    message_type = data.get("type")
    
    if message_type == "ping":
        await connection_manager.send_personal_message({
            "type": "pong",
            "timestamp": asyncio.get_event_loop().time()
        }, websocket)
    
    elif message_type == "subscribe":
        # Suscribir cliente a un grupo específico
        group = data.get("group", "general")
        connection_manager.client_info[websocket]["group"] = group
        
        await connection_manager.send_personal_message({
            "type": "subscribed",
            "group": group,
            "message": f"Suscrito al grupo: {group}"
        }, websocket)
    
    elif message_type == "get_stats":
        # Enviar estadísticas de conexión
        stats = {
            "type": "connection_stats",
            "data": {
                "total_connections": connection_manager.get_connection_count(),
                "clients": connection_manager.get_clients_info()
            }
        }
        await connection_manager.send_personal_message(stats, websocket)
    
    else:
        await connection_manager.send_personal_message({
            "type": "error",
            "message": f"Tipo de mensaje no reconocido: {message_type}"
        }, websocket)

async def start_websocket_server():
    """Iniciar servidor WebSocket"""
    logger.info(f"Iniciando servidor WebSocket en {settings.HOST}:{settings.WS_PORT}")
    
    server = await websockets.serve(
        handle_websocket_connection,
        settings.HOST,
        settings.WS_PORT
    )
    
    logger.info(f"Servidor WebSocket ejecutándose en ws://{settings.HOST}:{settings.WS_PORT}")
    return server
