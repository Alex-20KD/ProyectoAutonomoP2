from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.models.verificacion_donante import VerificacionDonante
from app.models.donante import Donante
from app.websockets.notification_service import NotificationService
from typing import List, Optional
from datetime import date

class VerificacionService:
    def __init__(self, db: Session):
        self.db = db
        self.notification_service = NotificationService()
    
    async def crear_verificacion(self, verificacion_data: dict) -> VerificacionDonante:
        """Crear una nueva verificación de donante"""
        # Verificar que el donante existe
        donante = self.db.query(Donante).filter(Donante.id == verificacion_data['donante_id']).first()
        if not donante:
            raise ValueError("Donante no encontrado")
        
        verificacion = VerificacionDonante(**verificacion_data)
        self.db.add(verificacion)
        self.db.commit()
        self.db.refresh(verificacion)
        
        # Notificación en tiempo real
        await self.notification_service.notify_verificacion_events("creada", {
            "id": verificacion.id,
            "donante_id": verificacion.donante_id,
            "donante_nombre": donante.nombre,
            "resultado": verificacion.resultado,
            "fecha": str(verificacion.fecha_verificacion)
        })
        
        # Si es rechazado, cambiar estado del donante
        if verificacion.resultado == "Rechazado":
            await self._cambiar_estado_donante_por_verificacion(donante, "Suspendido")
        
        return verificacion
    
    def obtener_verificacion(self, verificacion_id: int) -> Optional[VerificacionDonante]:
        """Obtener verificación por ID"""
        return self.db.query(VerificacionDonante).filter(VerificacionDonante.id == verificacion_id).first()
    
    def listar_verificaciones(self, skip: int = 0, limit: int = 100, resultado: str = None, donante_id: int = None) -> List[VerificacionDonante]:
        """Listar verificaciones con filtros opcionales"""
        query = self.db.query(VerificacionDonante)
        
        if resultado:
            query = query.filter(VerificacionDonante.resultado == resultado)
        
        if donante_id:
            query = query.filter(VerificacionDonante.donante_id == donante_id)
        
        return query.offset(skip).limit(limit).all()
    
    async def actualizar_verificacion(self, verificacion_id: int, datos_actualizacion: dict) -> Optional[VerificacionDonante]:
        """Actualizar verificación existente"""
        verificacion = self.obtener_verificacion(verificacion_id)
        if not verificacion:
            return None
        
        resultado_anterior = verificacion.resultado
        
        for key, value in datos_actualizacion.items():
            if hasattr(verificacion, key):
                setattr(verificacion, key, value)
        
        self.db.commit()
        self.db.refresh(verificacion)
        
        # Notificación de actualización
        donante = self.db.query(Donante).filter(Donante.id == verificacion.donante_id).first()
        await self.notification_service.notify_verificacion_events("actualizada", {
            "id": verificacion.id,
            "donante_id": verificacion.donante_id,
            "donante_nombre": donante.nombre if donante else "Desconocido",
            "resultado_anterior": resultado_anterior,
            "resultado_nuevo": verificacion.resultado,
            "cambios": list(datos_actualizacion.keys())
        })
        
        return verificacion
    
    def obtener_verificaciones_por_donante(self, donante_id: int) -> List[VerificacionDonante]:
        """Obtener todas las verificaciones de un donante"""
        return self.db.query(VerificacionDonante).filter(VerificacionDonante.donante_id == donante_id).order_by(VerificacionDonante.fecha_verificacion.desc()).all()
    
    def obtener_ultima_verificacion(self, donante_id: int) -> Optional[VerificacionDonante]:
        """Obtener la verificación más reciente de un donante"""
        return self.db.query(VerificacionDonante).filter(VerificacionDonante.donante_id == donante_id).order_by(VerificacionDonante.fecha_verificacion.desc()).first()
    
    async def revisar_verificacion(self, verificacion_id: int, nuevo_resultado: str, observaciones: str = None) -> Optional[VerificacionDonante]:
        """Revisar y cambiar resultado de verificación"""
        verificacion = self.obtener_verificacion(verificacion_id)
        if not verificacion:
            return None
        
        resultado_anterior = verificacion.resultado
        verificacion.resultado = nuevo_resultado
        
        if observaciones:
            verificacion.observaciones = observaciones
        
        self.db.commit()
        self.db.refresh(verificacion)
        
        # Cambiar estado del donante según el resultado
        donante = self.db.query(Donante).filter(Donante.id == verificacion.donante_id).first()
        if donante:
            if nuevo_resultado == "Aprobado":
                await self._cambiar_estado_donante_por_verificacion(donante, "Activo")
            elif nuevo_resultado == "Rechazado":
                await self._cambiar_estado_donante_por_verificacion(donante, "Suspendido")
        
        # Notificación de revisión
        await self.notification_service.notify_verificacion_events("revisada", {
            "id": verificacion.id,
            "donante_id": verificacion.donante_id,
            "donante_nombre": donante.nombre if donante else "Desconocido",
            "resultado_anterior": resultado_anterior,
            "resultado_nuevo": nuevo_resultado,
            "observaciones": observaciones
        })
        
        return verificacion
    
    def obtener_estadisticas_verificaciones(self) -> dict:
        """Obtener estadísticas de verificaciones"""
        total = self.db.query(VerificacionDonante).count()
        aprobadas = self.db.query(VerificacionDonante).filter(VerificacionDonante.resultado == "Aprobado").count()
        rechazadas = self.db.query(VerificacionDonante).filter(VerificacionDonante.resultado == "Rechazado").count()
        observaciones = self.db.query(VerificacionDonante).filter(VerificacionDonante.resultado == "Observación").count()
        
        return {
            "total": total,
            "aprobadas": aprobadas,
            "rechazadas": rechazadas,
            "con_observaciones": observaciones,
            "tasa_aprobacion": round((aprobadas / total * 100) if total > 0 else 0, 2)
        }
    
    async def _cambiar_estado_donante_por_verificacion(self, donante: Donante, nuevo_estado: str):
        """Cambiar estado del donante basado en verificación"""
        if donante.estado != nuevo_estado:
            estado_anterior = donante.estado
            donante.estado = nuevo_estado
            self.db.commit()
            
            # Notificar cambio de estado
            await self.notification_service.notify_donante_events("estado_cambiado_por_verificacion", {
                "id": donante.id,
                "nombre": donante.nombre,
                "estado_anterior": estado_anterior,
                "estado_nuevo": nuevo_estado,
                "motivo": "Resultado de verificación"
            })
