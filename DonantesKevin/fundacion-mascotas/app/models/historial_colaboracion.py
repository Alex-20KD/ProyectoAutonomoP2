from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.config.database import Base
from datetime import date

class HistorialColaboracion(Base):
    __tablename__ = "historial_colaboracion"
    
    id = Column(Integer, primary_key=True, index=True)
    donante_id = Column(Integer, ForeignKey("donantes.id"), nullable=False)
    tipo_colaboracion = Column(String(50), nullable=False)  # Mascota, Económica, Voluntariado, etc.
    descripcion = Column(Text)
    fecha_colaboracion = Column(Date, default=date.today)
    
    # Relaciones
    donante = relationship("Donante", back_populates="historial")
    
    def __repr__(self):
        return f"<HistorialColaboracion(id={self.id}, tipo='{self.tipo_colaboracion}', fecha={self.fecha_colaboracion})>"
