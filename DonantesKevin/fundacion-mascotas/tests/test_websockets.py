"""
Tests para WebSockets
"""

import pytest
import asyncio
import websockets
import json
from unittest.mock import AsyncMock, patch

@pytest.mark.asyncio
async def test_websocket_connection():
    """Test conexión WebSocket básica"""
    # Mock del servidor WebSocket
    with patch('websockets.serve') as mock_serve:
        mock_server = AsyncMock()
        mock_serve.return_value = mock_server
        
        from app.websockets.events import start_websocket_server
        server = await start_websocket_server()
        
        assert server is not None
        mock_serve.assert_called_once()

@pytest.mark.asyncio
async def test_notification_service():
    """Test servicio de notificaciones"""
    from app.websockets.notification_service import NotificationService
    
    service = NotificationService()
    
    # Mock del connection manager
    with patch.object(service.connection_manager, 'broadcast') as mock_broadcast:
        await service.notify_event({
            "type": "test_event",
            "data": {"test": "data"}
        })
        
        mock_broadcast.assert_called_once()
        call_args = mock_broadcast.call_args[0][0]
        assert call_args["type"] == "test_event"
        assert "timestamp" in call_args

@pytest.mark.asyncio
async def test_connection_manager():
    """Test manager de conexiones"""
    from app.websockets.connection_manager import ConnectionManager
    
    manager = ConnectionManager()
    
    # Mock WebSocket
    mock_websocket = AsyncMock()
    mock_websocket.send = AsyncMock()
    
    # Test conectar cliente
    await manager.connect(mock_websocket, {"test": "client"})
    assert mock_websocket in manager.active_connections
    
    # Test enviar mensaje personal
    await manager.send_personal_message({"test": "message"}, mock_websocket)
    mock_websocket.send.assert_called_once()
    
    # Test desconectar
    manager.disconnect(mock_websocket)
    assert mock_websocket not in manager.active_connections
