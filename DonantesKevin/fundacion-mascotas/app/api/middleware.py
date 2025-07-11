from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import JSONResponse
import time
import logging
from typing import Callable
import uuid

logger = logging.getLogger(__name__)

class LoggingMiddleware(BaseHTTPMiddleware):
    """Middleware para logging de requests y responses"""
    
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        # Generar ID único para el request
        request_id = str(uuid.uuid4())[:8]
        
        # Log del request entrante
        start_time = time.time()
        logger.info(f"[{request_id}] {request.method} {request.url.path} - Cliente: {request.client.host}")
        
        try:
            # Procesar request
            response = await call_next(request)
            
            # Calcular tiempo de procesamiento
            process_time = time.time() - start_time
            
            # Log del response
            logger.info(f"[{request_id}] Completado en {process_time:.3f}s - Status: {response.status_code}")
            
            # Agregar headers de respuesta
            response.headers["X-Request-ID"] = request_id
            response.headers["X-Process-Time"] = str(process_time)
            
            return response
            
        except Exception as e:
            # Log de errores
            process_time = time.time() - start_time
            logger.error(f"[{request_id}] Error después de {process_time:.3f}s: {str(e)}")
            
            # Retornar error JSON
            return JSONResponse(
                status_code=500,
                content={
                    "error": "Error interno del servidor",
                    "request_id": request_id,
                    "detail": str(e) if logger.level <= logging.DEBUG else "Error interno"
                },
                headers={"X-Request-ID": request_id}
            )

class CORSMiddleware(BaseHTTPMiddleware):
    """Middleware personalizado para CORS"""
    
    def __init__(self, app, allow_origins: list = None, allow_methods: list = None, allow_headers: list = None):
        super().__init__(app)
        self.allow_origins = allow_origins or ["*"]
        self.allow_methods = allow_methods or ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
        self.allow_headers = allow_headers or ["*"]
    
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        # Manejar preflight requests
        if request.method == "OPTIONS":
            response = Response()
            response.headers["Access-Control-Allow-Origin"] = "*"
            response.headers["Access-Control-Allow-Methods"] = ", ".join(self.allow_methods)
            response.headers["Access-Control-Allow-Headers"] = ", ".join(self.allow_headers)
            response.headers["Access-Control-Max-Age"] = "86400"
            return response
        
        # Procesar request normal
        response = await call_next(request)
        
        # Agregar headers CORS
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Credentials"] = "true"
        
        return response

class SecurityMiddleware(BaseHTTPMiddleware):
    """Middleware para headers de seguridad básicos"""
    
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        response = await call_next(request)
        
        # Headers de seguridad
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        
        return response

class RateLimitMiddleware(BaseHTTPMiddleware):
    """Middleware básico de rate limiting"""
    
    def __init__(self, app, max_requests: int = 100, window_seconds: int = 60):
        super().__init__(app)
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.clients = {}  # En producción usar Redis
    
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        client_ip = request.client.host
        current_time = time.time()
        
        # Limpiar registros antiguos
        if client_ip in self.clients:
            self.clients[client_ip] = [
                req_time for req_time in self.clients[client_ip]
                if current_time - req_time < self.window_seconds
            ]
        else:
            self.clients[client_ip] = []
        
        # Verificar límite
        if len(self.clients[client_ip]) >= self.max_requests:
            return JSONResponse(
                status_code=429,
                content={
                    "error": "Demasiadas peticiones",
                    "detail": f"Límite de {self.max_requests} peticiones por {self.window_seconds} segundos excedido"
                }
            )
        
        # Registrar petición
        self.clients[client_ip].append(current_time)
        
        return await call_next(request)

class DatabaseMiddleware(BaseHTTPMiddleware):
    """Middleware para manejo de conexiones de base de datos"""
    
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        try:
            response = await call_next(request)
            return response
        except Exception as e:
            # Log específico para errores de base de datos
            if "database" in str(e).lower() or "connection" in str(e).lower():
                logger.error(f"Error de base de datos: {str(e)}")
                return JSONResponse(
                    status_code=503,
                    content={
                        "error": "Servicio no disponible",
                        "detail": "Error de conexión con la base de datos"
                    }
                )
            raise e

# Función para configurar todos los middlewares
def setup_middlewares(app):
    """Configurar todos los middlewares en la aplicación"""
    
    # Orden importante: de más específico a más general
    app.add_middleware(DatabaseMiddleware)
    app.add_middleware(RateLimitMiddleware, max_requests=100, window_seconds=60)
    app.add_middleware(SecurityMiddleware)
    app.add_middleware(LoggingMiddleware)
    
    logger.info("Middlewares configurados correctamente")
