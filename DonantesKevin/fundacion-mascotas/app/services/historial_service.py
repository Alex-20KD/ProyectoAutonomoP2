from sqlalchemy.orm import Session
from sqlalchemy import and_, func, extract
from app.models.historial_colaboracion import HistorialColaboracion
from app.models.donante import Donante
from app.websockets.notification_service import NotificationService
from app.websockets.central_connector import central_connector
from typing import List, Optional, Dict, Any
from datetime import date, datetime, timedelta

class HistorialService:
    def __init__(self, db: Session):
        self.db = db
        self.notification_service = NotificationService()
    
    async def crear_colaboracion(self, colaboracion_data: dict) -> HistorialColaboracion:
        """Registrar una nueva colaboración"""
        # Verificar que el donante existe
        donante = self.db.query(Donante).filter(Donante.id == colaboracion_data['donante_id']).first()
        if not donante:
            raise ValueError("Donante no encontrado")
        
        colaboracion = HistorialColaboracion(**colaboracion_data)
        self.db.add(colaboracion)
        self.db.commit()
        self.db.refresh(colaboracion)
        
        # Notificación local
        await self.notification_service.notify_event({
            "type": "colaboracion_registrada",
            "category": "historial",
            "data": {
                "id": colaboracion.id,
                "donante_id": colaboracion.donante_id,
                "donante_nombre": donante.nombre,
                "tipo_colaboracion": colaboracion.tipo_colaboracion,
                "descripcion": colaboracion.descripcion,
                "fecha": str(colaboracion.fecha_colaboracion)
            }
        })
        
        # Notificación al WebSocket Central
        await central_connector.send_event({
            "type": "nueva_colaboracion",
            "category": "historial",
            "priority": "medium",
            "data": {
                "id": colaboracion.id,
                "donante_id": colaboracion.donante_id,
                "donante_nombre": donante.nombre,
                "donante_correo": donante.correo,
                "tipo_colaboracion": colaboracion.tipo_colaboracion,
                "descripcion": colaboracion.descripcion,
                "fecha_colaboracion": str(colaboracion.fecha_colaboracion)
            }
        })
        
        return colaboracion
    
    def obtener_colaboracion(self, colaboracion_id: int) -> Optional[HistorialColaboracion]:
        """Obtener colaboración por ID"""
        return self.db.query(HistorialColaboracion).filter(HistorialColaboracion.id == colaboracion_id).first()
    
    def listar_colaboraciones(self, skip: int = 0, limit: int = 100, tipo: str = None, donante_id: int = None, fecha_desde: date = None, fecha_hasta: date = None) -> List[HistorialColaboracion]:
        """Listar colaboraciones con filtros opcionales"""
        query = self.db.query(HistorialColaboracion)
        
        if tipo:
            query = query.filter(HistorialColaboracion.tipo_colaboracion == tipo)
        
        if donante_id:
            query = query.filter(HistorialColaboracion.donante_id == donante_id)
        
        if fecha_desde:
            query = query.filter(HistorialColaboracion.fecha_colaboracion >= fecha_desde)
        
        if fecha_hasta:
            query = query.filter(HistorialColaboracion.fecha_colaboracion <= fecha_hasta)
        
        return query.order_by(HistorialColaboracion.fecha_colaboracion.desc()).offset(skip).limit(limit).all()
    
    async def actualizar_colaboracion(self, colaboracion_id: int, datos_actualizacion: dict) -> Optional[HistorialColaboracion]:
        """Actualizar información de la colaboración"""
        colaboracion = self.obtener_colaboracion(colaboracion_id)
        if not colaboracion:
            return None
        
        for key, value in datos_actualizacion.items():
            if hasattr(colaboracion, key):
                setattr(colaboracion, key, value)
        
        self.db.commit()
        self.db.refresh(colaboracion)
        
        # Notificación local
        donante = self.db.query(Donante).filter(Donante.id == colaboracion.donante_id).first()
        await self.notification_service.notify_event({
            "type": "colaboracion_actualizada",
            "category": "historial",
            "data": {
                "id": colaboracion.id,
                "donante_id": colaboracion.donante_id,
                "donante_nombre": donante.nombre if donante else "Desconocido",
                "tipo_colaboracion": colaboracion.tipo_colaboracion,
                "cambios": list(datos_actualizacion.keys())
            }
        })
        
        # Notificación al WebSocket Central
        await central_connector.send_event({
            "type": "colaboracion_actualizada",
            "category": "historial",
            "data": {
                "id": colaboracion.id,
                "donante_id": colaboracion.donante_id,
                "donante_nombre": donante.nombre if donante else "Desconocido",
                "tipo_colaboracion": colaboracion.tipo_colaboracion,
                "cambios": list(datos_actualizacion.keys())
            }
        })
        
        return colaboracion
    
    async def eliminar_colaboracion(self, colaboracion_id: int) -> bool:
        """Eliminar una colaboración del historial"""
        colaboracion = self.obtener_colaboracion(colaboracion_id)
        if not colaboracion:
            return False
        
        # Obtener datos para notificación antes de eliminar
        donante = self.db.query(Donante).filter(Donante.id == colaboracion.donante_id).first()
        colaboracion_data = {
            "id": colaboracion.id,
            "donante_id": colaboracion.donante_id,
            "donante_nombre": donante.nombre if donante else "Desconocido",
            "tipo_colaboracion": colaboracion.tipo_colaboracion,
            "descripcion": colaboracion.descripcion,
            "fecha": str(colaboracion.fecha_colaboracion)
        }
        
        self.db.delete(colaboracion)
        self.db.commit()
        
        # Notificación local
        await self.notification_service.notify_event({
            "type": "colaboracion_eliminada",
            "category": "historial",
            "data": colaboracion_data
        })
        
        # Notificación al WebSocket Central
        await central_connector.send_event({
            "type": "colaboracion_eliminada",
            "category": "historial",
            "data": colaboracion_data
        })
        
        return True
    
    def obtener_historial_por_donante(self, donante_id: int) -> List[HistorialColaboracion]:
        """Obtener todo el historial de colaboraciones de un donante"""
        return self.db.query(HistorialColaboracion).filter(HistorialColaboracion.donante_id == donante_id).order_by(HistorialColaboracion.fecha_colaboracion.desc()).all()
    
    def obtener_colaboraciones_por_tipo(self, tipo_colaboracion: str) -> List[HistorialColaboracion]:
        """Obtener colaboraciones por tipo específico"""
        return self.db.query(HistorialColaboracion).filter(HistorialColaboracion.tipo_colaboracion == tipo_colaboracion).order_by(HistorialColaboracion.fecha_colaboracion.desc()).all()
    
    def obtener_colaboraciones_recientes(self, dias: int = 30) -> List[HistorialColaboracion]:
        """Obtener colaboraciones de los últimos N días"""
        fecha_limite = date.today() - timedelta(days=dias)
        return self.db.query(HistorialColaboracion).filter(HistorialColaboracion.fecha_colaboracion >= fecha_limite).order_by(HistorialColaboracion.fecha_colaboracion.desc()).all()
    
    def buscar_colaboraciones(self, termino: str) -> List[HistorialColaboracion]:
        """Buscar colaboraciones por descripción o tipo"""
        return self.db.query(HistorialColaboracion).filter(
            HistorialColaboracion.descripcion.ilike(f"%{termino}%") |
            HistorialColaboracion.tipo_colaboracion.ilike(f"%{termino}%")
        ).order_by(HistorialColaboracion.fecha_colaboracion.desc()).all()
    
    def obtener_estadisticas_colaboraciones(self) -> Dict[str, Any]:
        """Obtener estadísticas completas de colaboraciones - Compatible con SQLite"""
        total = self.db.query(HistorialColaboracion).count()
        
        # Estadísticas por tipo
        tipos_stats = self.db.query(
            HistorialColaboracion.tipo_colaboracion,
            func.count(HistorialColaboracion.id).label('cantidad')
        ).group_by(HistorialColaboracion.tipo_colaboracion).all()
        
        # Colaboraciones por mes - Compatible con SQLite
        hace_12_meses = date.today() - timedelta(days=365)
        colaboraciones_mensuales = self.db.query(
            extract('year', HistorialColaboracion.fecha_colaboracion).label('año'),
            extract('month', HistorialColaboracion.fecha_colaboracion).label('mes'),
            func.count(HistorialColaboracion.id).label('cantidad')
        ).filter(
            HistorialColaboracion.fecha_colaboracion >= hace_12_meses
        ).group_by(
            extract('year', HistorialColaboracion.fecha_colaboracion),
            extract('month', HistorialColaboracion.fecha_colaboracion)
        ).order_by('año', 'mes').all()
        
        # Donantes más activos
        donantes_activos = self.db.query(
            HistorialColaboracion.donante_id,
            func.count(HistorialColaboracion.id).label('total_colaboraciones')
        ).group_by(HistorialColaboracion.donante_id).order_by(func.count(HistorialColaboracion.id).desc()).limit(10).all()
        
        # Colaboraciones recientes (últimos 30 días)
        hace_30_dias = date.today() - timedelta(days=30)
        colaboraciones_recientes = self.db.query(HistorialColaboracion).filter(
            HistorialColaboracion.fecha_colaboracion >= hace_30_dias
        ).count()
        
        return {
            "total_colaboraciones": total,
            "colaboraciones_recientes_30_dias": colaboraciones_recientes,
            "por_tipo": {tipo: cantidad for tipo, cantidad in tipos_stats},
            "por_mes": [
                {
                    "mes": f"{int(año)}-{int(mes):02d}",
                    "cantidad": cantidad
                } for año, mes, cantidad in colaboraciones_mensuales
            ],
            "donantes_mas_activos": [
                {
                    "donante_id": donante_id,
                    "total_colaboraciones": total_colab
                } for donante_id, total_colab in donantes_activos
            ]
        }
    
    def obtener_resumen_donante(self, donante_id: int) -> Dict[str, Any]:
        """Obtener resumen completo de colaboraciones de un donante"""
        colaboraciones = self.obtener_historial_por_donante(donante_id)
        
        if not colaboraciones:
            return {
                "donante_id": donante_id,
                "total_colaboraciones": 0,
                "tipos_colaboracion": [],
                "primera_colaboracion": None,
                "ultima_colaboracion": None
            }
        
        # Agrupar por tipo
        tipos_count = {}
        for colab in colaboraciones:
            tipo = colab.tipo_colaboracion
            tipos_count[tipo] = tipos_count.get(tipo, 0) + 1
        
        return {
            "donante_id": donante_id,
            "total_colaboraciones": len(colaboraciones),
            "tipos_colaboracion": tipos_count,
            "primera_colaboracion": str(colaboraciones[-1].fecha_colaboracion),
            "ultima_colaboracion": str(colaboraciones[0].fecha_colaboracion),
            "colaboraciones_detalle": [
                {
                    "id": c.id,
                    "tipo": c.tipo_colaboracion,
                    "descripcion": c.descripcion,
                    "fecha": str(c.fecha_colaboracion)
                } for c in colaboraciones[:5]  # Últimas 5
            ]
        }
