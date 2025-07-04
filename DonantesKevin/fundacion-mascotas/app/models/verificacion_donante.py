from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.config.database import Base
from datetime import date

class VerificacionDonante(Base):
    __tablename__ = "verificaciones_donante"
    
    id = Column(Integer, primary_key=True, index=True)
    donante_id = Column(Integer, ForeignKey("donantes.id"), nullable=False)
    fecha_verificacion = Column(Date, default=date.today)
    resultado = Column(String(20), nullable=False)  # Aprobado, Observación, Rechazado
    observaciones = Column(Text)
    
    # Relaciones
    donante = relationship("Donante", back_populates="verificaciones")
    
    def __repr__(self):
        return f"<VerificacionDonante(id={self.id}, donante_id={self.donante_id}, resultado='{self.resultado}')>"
