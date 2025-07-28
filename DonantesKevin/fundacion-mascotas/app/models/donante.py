from sqlalchemy import Column, Integer, String, Date, Text
from sqlalchemy.orm import relationship
from app.config.database_sqlite import Base
from datetime import date

class Donante(Base):
    __tablename__ = "donantes"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)
    correo = Column(String(255), unique=True, nullable=False)
    telefono = Column(String(20), nullable=False)
    direccion = Column(Text)
    tipo_documento = Column(String(50), nullable=False)  # DNI, Pasaporte, etc.
    numero_documento = Column(String(50), unique=True, nullable=False)
    fecha_registro = Column(Date, default=date.today)
    estado = Column(String(20), default="Activo")  # Activo, Inactivo, Suspendido
    
    # Relaciones
    mascotas_donadas = relationship("MascotaDonada", back_populates="donante")
    verificaciones = relationship("VerificacionDonante", back_populates="donante")
    contactos = relationship("InformacionContacto", back_populates="donante")
    historial = relationship("HistorialColaboracion", back_populates="donante")
    
    def __repr__(self):
        return f"<Donante(id={self.id}, nombre='{self.nombre}', estado='{self.estado}')>"
