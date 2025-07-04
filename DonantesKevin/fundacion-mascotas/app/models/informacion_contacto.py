from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.config.database import Base

class InformacionContacto(Base):
    __tablename__ = "informacion_contacto"
    
    id = Column(Integer, primary_key=True, index=True)
    donante_id = Column(Integer, ForeignKey("donantes.id"), nullable=False)
    nombre_contacto = Column(String(255), nullable=False)
    telefono = Column(String(20), nullable=False)
    relacion = Column(String(100), nullable=False)  # amigo, familiar, etc.
    
    # Relaciones
    donante = relationship("Donante", back_populates="contactos")
    
    def __repr__(self):
        return f"<InformacionContacto(id={self.id}, nombre='{self.nombre_contacto}', relacion='{self.relacion}')>"
