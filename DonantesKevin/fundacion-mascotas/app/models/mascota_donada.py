from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.config.database import Base
from datetime import date

class MascotaDonada(Base):
    __tablename__ = "mascotas_donadas"
    
    id = Column(Integer, primary_key=True, index=True)
    donante_id = Column(Integer, ForeignKey("donantes.id"), nullable=False)
    mascota_id = Column(Integer, nullable=False)  # FK a tabla mascotas (otro módulo)
    fecha_donacion = Column(Date, default=date.today)
    motivo_donacion = Column(Text)
    estado_revision = Column(String(20), default="Pendiente")  # Pendiente, Aceptada, Rechazada
    
    # Relaciones
    donante = relationship("Donante", back_populates="mascotas_donadas")
    
    def __repr__(self):
        return f"<MascotaDonada(id={self.id}, donante_id={self.donante_id}, estado='{self.estado_revision}')>"
