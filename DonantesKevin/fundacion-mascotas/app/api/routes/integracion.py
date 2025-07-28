from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from pydantic import BaseModel
from datetime import datetime

from app.config.database_sqlite import get_db
from app.services.integracion_service import IntegracionService

router = APIRouter(prefix="/integracion", tags=["integracion"])

# Schemas para integración
class DonacionMascotaRequest(BaseModel):
    donante_id: int
    name: str
    especie: str
    raza: str
    edad: int
    genero: str
    descripcion: str
    foto_url: str = None

class AdopcionCompletaRequest(BaseModel):
    donante_facilitador_id: int
    mascota_id: int
    adoptante_id: int

@router.get("/health-servicios")
async def verificar_servicios():
    """Verificar conectividad con todos los servicios externos"""
    service = IntegracionService()
    return await service.verificar_servicios_conectados()

# ===============================
# ENDPOINTS PARA SERVICIO MASCOTAS
# ===============================

@router.get("/mascotas/disponibles")
async def obtener_mascotas_disponibles():
    """Obtener mascotas disponibles para adopción"""
    service = IntegracionService()
    return await service.obtener_mascotas_disponibles()

@router.get("/mascotas/{mascota_id}")
async def obtener_mascota(mascota_id: int):
    """Obtener información de una mascota específica"""
    service = IntegracionService()
    return await service.obtener_mascota_por_id(mascota_id)

@router.post("/mascotas")
async def crear_mascota(mascota_data: dict):
    """Crear una nueva mascota"""
    service = IntegracionService()
    return await service.crear_mascota(mascota_data)

@router.patch("/mascotas/{mascota_id}")
async def actualizar_mascota(mascota_id: int, mascota_data: dict):
    """Actualizar información de una mascota"""
    service = IntegracionService()
    return await service.actualizar_mascota(mascota_id, mascota_data)

@router.delete("/mascotas/{mascota_id}")
async def eliminar_mascota(mascota_id: int):
    """Eliminar una mascota"""
    service = IntegracionService()
    resultado = await service.eliminar_mascota(mascota_id)
    return {"message": "Mascota eliminada correctamente", "success": resultado}

# ===============================
# ENDPOINTS PARA SERVICIO LEGALIZACION
# ===============================

@router.get("/legalizacion/procesos")
async def obtener_procesos_legalizacion():
    """Obtener todos los procesos de legalización"""
    service = IntegracionService()
    return await service.obtener_procesos_legalizacion()

@router.get("/legalizacion/procesos/{proceso_id}")
async def obtener_proceso_legalizacion(proceso_id: int):
    """Obtener información de un proceso de legalización específico"""
    service = IntegracionService()
    return await service.obtener_proceso_por_id(proceso_id)

@router.post("/legalizacion/procesos")
async def crear_proceso_legalizacion(proceso_data: dict):
    """Crear un nuevo proceso de legalización"""
    service = IntegracionService()
    return await service.crear_proceso_legalizacion(proceso_data)

@router.put("/legalizacion/procesos/{proceso_id}")
async def actualizar_proceso_legalizacion(proceso_id: int, proceso_data: dict):
    """Actualizar un proceso de legalización"""
    service = IntegracionService()
    return await service.actualizar_proceso_legalizacion(proceso_id, proceso_data)

@router.delete("/legalizacion/procesos/{proceso_id}")
async def eliminar_proceso_legalizacion(proceso_id: int):
    """Eliminar un proceso de legalización"""
    service = IntegracionService()
    resultado = await service.eliminar_proceso_legalizacion(proceso_id)
    return {"message": "Proceso de legalización eliminado correctamente", "success": resultado}

# ===============================
# ENDPOINTS DE OPERACIONES INTEGRADAS
# ===============================

@router.post("/donacion-mascota")
async def procesar_donacion_mascota(request: DonacionMascotaRequest):
    """Procesar donación de una mascota (crear mascota + vincular donante)"""
    service = IntegracionService()
    
    mascota_data = {
        "name": request.name,
        "especie": request.especie,
        "raza": request.raza,
        "edad": request.edad,
        "genero": request.genero,
        "descripcion": request.descripcion,
        "foto_url": request.foto_url,
        "estado_adopcion": True  # Disponible para adopción
    }
    
    return await service.procesar_donacion_mascota(request.donante_id, mascota_data)

@router.post("/adopcion-completa")
async def iniciar_adopcion_completa(request: AdopcionCompletaRequest):
    """Iniciar proceso completo de adopción"""
    service = IntegracionService()
    return await service.iniciar_adopcion_completa(
        request.donante_facilitador_id,
        request.mascota_id,
        request.adoptante_id
    )

# ===============================
# ENDPOINTS DE MONITOREO
# ===============================

@router.get("/estadisticas")
async def obtener_estadisticas_integracion():
    """Obtener estadísticas de integración con otros servicios"""
    service = IntegracionService()
    
    try:
        # Obtener datos de ambos servicios
        mascotas = await service.obtener_mascotas_disponibles()
        procesos = await service.obtener_procesos_legalizacion()
        servicios_status = await service.verificar_servicios_conectados()
        
        return {
            "timestamp": datetime.now().isoformat(),
            "mascotas_disponibles": len(mascotas) if mascotas else 0,
            "procesos_legalizacion_activos": len(procesos) if procesos else 0,
            "servicios_conectados": servicios_status,
            "integracion_activa": servicios_status.get("servicios_conectados", 0) >= 2
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=503, 
            detail=f"Error obteniendo estadísticas: {str(e)}"
        )

@router.get("/test-conexion")
async def test_conexion_servicios():
    """Endpoint para testing de conexión con otros servicios"""
    service = IntegracionService()
    
    resultados = {
        "timestamp": datetime.now().isoformat(),
        "tests": {}
    }
    
    # Test servicio mascotas
    try:
        mascotas = await service.obtener_mascotas_disponibles()
        resultados["tests"]["mascotas"] = {
            "estado": "conectado",
            "respuesta": f"Obtuvo {len(mascotas)} mascotas"
        }
    except Exception as e:
        resultados["tests"]["mascotas"] = {
            "estado": "error",
            "respuesta": str(e)
        }
    
    # Test servicio legalización
    try:
        procesos = await service.obtener_procesos_legalizacion()
        resultados["tests"]["legalizacion"] = {
            "estado": "conectado",
            "respuesta": f"Obtuvo {len(procesos)} procesos"
        }
    except Exception as e:
        resultados["tests"]["legalizacion"] = {
            "estado": "error", 
            "respuesta": str(e)
        }
    
    # Resumen
    tests_exitosos = sum(1 for test in resultados["tests"].values() if test["estado"] == "conectado")
    resultados["resumen"] = {
        "total_tests": len(resultados["tests"]),
        "tests_exitosos": tests_exitosos,
        "porcentaje_exito": (tests_exitosos / len(resultados["tests"])) * 100 if resultados["tests"] else 0
    }
    
    return resultados
