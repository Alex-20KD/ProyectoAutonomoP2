import httpx
import logging
from typing import List, Dict, Optional, Any
from fastapi import HTTPException

logger = logging.getLogger(__name__)

class IntegracionService:
    """Servicio para integración con otros módulos del sistema"""
    
    def __init__(self):
        self.mascotas_url = "http://localhost:3002"
        self.legalizacion_url = "http://localhost:5249"
        self.api_gateway_url = "http://localhost:5000"
        
    async def _make_request(self, url: str, method: str = "GET", data: Dict = None) -> Dict:
        """Realizar petición HTTP a otro servicio"""
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                if method.upper() == "GET":
                    response = await client.get(url)
                elif method.upper() == "POST":
                    response = await client.post(url, json=data)
                elif method.upper() == "PUT":
                    response = await client.put(url, json=data)
                elif method.upper() == "PATCH":
                    response = await client.patch(url, json=data)
                elif method.upper() == "DELETE":
                    response = await client.delete(url)
                else:
                    raise ValueError(f"Método HTTP no soportado: {method}")
                
                response.raise_for_status()
                return response.json() if response.content else {}
                
        except httpx.RequestError as e:
            logger.error(f"Error de conexión con {url}: {e}")
            raise HTTPException(status_code=503, detail=f"Servicio no disponible: {url}")
        except httpx.HTTPStatusError as e:
            logger.error(f"Error HTTP {e.response.status_code} en {url}: {e}")
            raise HTTPException(status_code=e.response.status_code, detail=f"Error en servicio externo")
    
    # ===============================
    # INTEGRACION CON SERVICIO MASCOTAS
    # ===============================
    
    async def obtener_mascotas_disponibles(self) -> List[Dict]:
        """Obtener lista de mascotas disponibles para adopción"""
        url = f"{self.mascotas_url}/mascotas/disponibles"
        return await self._make_request(url)
    
    async def obtener_mascota_por_id(self, mascota_id: int) -> Dict:
        """Obtener información de una mascota específica"""
        url = f"{self.mascotas_url}/mascotas/{mascota_id}"
        return await self._make_request(url)
    
    async def crear_mascota(self, mascota_data: Dict) -> Dict:
        """Crear una nueva mascota en el sistema"""
        url = f"{self.mascotas_url}/mascotas"
        return await self._make_request(url, "POST", mascota_data)
    
    async def actualizar_mascota(self, mascota_id: int, mascota_data: Dict) -> Dict:
        """Actualizar información de una mascota"""
        url = f"{self.mascotas_url}/mascotas/{mascota_id}"
        return await self._make_request(url, "PATCH", mascota_data)
    
    async def eliminar_mascota(self, mascota_id: int) -> bool:
        """Eliminar una mascota del sistema"""
        url = f"{self.mascotas_url}/mascotas/{mascota_id}"
        await self._make_request(url, "DELETE")
        return True
    
    # ===============================
    # INTEGRACION CON SERVICIO LEGALIZACION
    # ===============================
    
    async def obtener_procesos_legalizacion(self) -> List[Dict]:
        """Obtener lista de procesos de legalización"""
        url = f"{self.legalizacion_url}/api/adopciones"
        return await self._make_request(url)
    
    async def obtener_proceso_por_id(self, proceso_id: int) -> Dict:
        """Obtener información de un proceso de legalización específico"""
        url = f"{self.legalizacion_url}/api/adopciones/{proceso_id}"
        return await self._make_request(url)
    
    async def crear_proceso_legalizacion(self, proceso_data: Dict) -> Dict:
        """Crear un nuevo proceso de legalización"""
        url = f"{self.legalizacion_url}/api/adopciones"
        return await self._make_request(url, "POST", proceso_data)
    
    async def actualizar_proceso_legalizacion(self, proceso_id: int, proceso_data: Dict) -> Dict:
        """Actualizar un proceso de legalización"""
        url = f"{self.legalizacion_url}/api/adopciones/{proceso_id}"
        await self._make_request(url, "PUT", proceso_data)
        return {"message": "Proceso actualizado correctamente"}
    
    async def eliminar_proceso_legalizacion(self, proceso_id: int) -> bool:
        """Eliminar un proceso de legalización"""
        url = f"{self.legalizacion_url}/api/adopciones/{proceso_id}"
        await self._make_request(url, "DELETE")
        return True
    
    # ===============================
    # OPERACIONES INTEGRADAS
    # ===============================
    
    async def procesar_donacion_mascota(self, donante_id: int, mascota_data: Dict) -> Dict:
        """Procesar donación de una mascota (crear mascota + vincular donante)"""
        try:
            # 1. Crear la mascota en el sistema
            mascota_creada = await self.crear_mascota(mascota_data)
            
            # 2. Registrar la donación (esto se podría expandir para crear un registro de donación)
            resultado = {
                "donante_id": donante_id,
                "mascota_creada": mascota_creada,
                "estado": "donacion_procesada",
                "mensaje": f"Mascota '{mascota_creada.get('name')}' donada exitosamente"
            }
            
            logger.info(f"Donación procesada - Donante: {donante_id}, Mascota: {mascota_creada.get('id')}")
            return resultado
            
        except Exception as e:
            logger.error(f"Error procesando donación: {e}")
            raise HTTPException(status_code=500, detail="Error procesando donación de mascota")
    
    async def iniciar_adopcion_completa(self, donante_id: int, mascota_id: int, adoptante_id: int) -> Dict:
        """Proceso completo de adopción: verificar mascota + crear proceso legal"""
        try:
            # 1. Verificar que la mascota existe y está disponible
            mascota = await self.obtener_mascota_por_id(mascota_id)
            
            if not mascota.get('estado_adopcion', False):
                raise HTTPException(status_code=400, detail="La mascota no está disponible para adopción")
            
            # 2. Crear proceso de legalización
            proceso_data = {
                "fechaAdopcion": "2025-07-28T00:00:00",
                "estado": "En Proceso",
                "mascotaId": mascota_id,
                "adoptanteId": adoptante_id
            }
            
            proceso_creado = await self.crear_proceso_legalizacion(proceso_data)
            
            # 3. Actualizar mascota como no disponible
            await self.actualizar_mascota(mascota_id, {"estado_adopcion": False})
            
            resultado = {
                "donante_facilitador_id": donante_id,
                "mascota": mascota,
                "proceso_legalizacion": proceso_creado,
                "adoptante_id": adoptante_id,
                "estado": "adopcion_iniciada",
                "mensaje": "Proceso de adopción iniciado correctamente"
            }
            
            logger.info(f"Adopción iniciada - Mascota: {mascota_id}, Proceso: {proceso_creado.get('id')}")
            return resultado
            
        except Exception as e:
            logger.error(f"Error iniciando adopción: {e}")
            raise HTTPException(status_code=500, detail="Error iniciando proceso de adopción")
    
    async def verificar_servicios_conectados(self) -> Dict:
        """Verificar conectividad con todos los servicios externos"""
        servicios = {
            "mascotas": {"url": self.mascotas_url, "estado": "desconectado"},
            "legalizacion": {"url": self.legalizacion_url, "estado": "desconectado"},
            "api_gateway": {"url": self.api_gateway_url, "estado": "desconectado"}
        }
        
        # Verificar servicio de mascotas
        try:
            await self._make_request(f"{self.mascotas_url}/mascotas/disponibles")
            servicios["mascotas"]["estado"] = "conectado"
        except:
            pass
        
        # Verificar servicio de legalización
        try:
            await self._make_request(f"{self.legalizacion_url}/api/adopciones")
            servicios["legalizacion"]["estado"] = "conectado"
        except:
            pass
        
        # Verificar API Gateway
        try:
            await self._make_request(f"{self.api_gateway_url}/health")
            servicios["api_gateway"]["estado"] = "conectado"
        except:
            pass
        
        servicios_conectados = sum(1 for s in servicios.values() if s["estado"] == "conectado")
        
        return {
            "servicios": servicios,
            "total_servicios": len(servicios),
            "servicios_conectados": servicios_conectados,
            "estado_general": "operativo" if servicios_conectados == len(servicios) else "parcial"
        }
