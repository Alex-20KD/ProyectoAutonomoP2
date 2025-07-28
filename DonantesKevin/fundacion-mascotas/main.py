import asyncio
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.config.settings_sqlite import settings
from app.config.database_sqlite import engine, Base
from app.api.routes import donantes, mascotas, verificaciones, contactos, historial, integracion
from app.websockets.events import start_websocket_server
from app.websockets.notification_service import notification_service
from app.api.middleware import setup_middlewares

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Importar modelos para que SQLAlchemy los reconozca
from app.models import (
    Donante,
    MascotaDonada,
    VerificacionDonante,
    InformacionContacto,
    HistorialColaboracion
)

# Crear tablas
Base.metadata.create_all(bind=engine)

# Crear aplicación FastAPI
app = FastAPI(
    title="Sistema de Donantes - Fundación de Mascotas",
    description="API para gestión de donantes y donaciones de mascotas",
    version="1.0.0"
)

# Configurar middlewares
setup_middlewares(app)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(donantes.router, prefix="/api/v1")
app.include_router(mascotas.router, prefix="/api/v1")
app.include_router(verificaciones.router, prefix="/api/v1")
app.include_router(contactos.router, prefix="/api/v1")
app.include_router(historial.router, prefix="/api/v1")
app.include_router(integracion.router, prefix="/api/v1")

@app.get("/")
async def root():
    return {
        "message": "Sistema de Donantes - Fundación de Mascotas",
        "version": "1.0.0",
        "websocket_url": f"ws://{settings.HOST}:{settings.WS_PORT}",
        "api_docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "websocket_connections": notification_service.get_connection_stats()
    }

@app.post("/api/v1/notify")
async def manual_notification(event_data: dict):
    """Endpoint para enviar notificaciones manuales (para testing)"""
    try:
        await notification_service.notify_event(event_data)
        return {"message": "Notificación enviada", "data": event_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def main():
    """Función principal para ejecutar tanto FastAPI como WebSocket"""
    # Iniciar servidor WebSocket
    websocket_server = await start_websocket_server()
    
    # Configurar y ejecutar FastAPI
    config = uvicorn.Config(
        app,
        host=settings.HOST,
        port=settings.PORT,
        log_level="info"
    )
    server = uvicorn.Server(config)
    
    logger.info(f"Iniciando servidor FastAPI en http://{settings.HOST}:{settings.PORT}")
    logger.info(f"Documentación disponible en http://{settings.HOST}:{settings.PORT}/docs")
    
    # Ejecutar ambos servidores concurrentemente
    await asyncio.gather(
        server.serve(),
        websocket_server.wait_closed()
    )

if __name__ == "__main__":
    asyncio.run(main())
