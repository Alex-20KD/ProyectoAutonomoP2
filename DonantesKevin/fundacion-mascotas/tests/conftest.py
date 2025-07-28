"""
Configuración de pytest y fixtures
"""

import pytest
import asyncio
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient
from app.config.database import Base, get_db
from app.config.settings import settings
from main import app

# Base de datos de prueba
TEST_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="session")
def test_db():
    """Crear base de datos de prueba"""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def client(test_db):
    """Cliente de prueba para FastAPI"""
    return TestClient(app)

@pytest.fixture
def sample_donante():
    """Datos de ejemplo para donante"""
    return {
        "nombre": "Juan Pérez Test",
        "correo": "juan.test@gmail.com",  # ✅ Cambiar a dominio real
        "telefono": "+57-300-123-4567",
        "direccion": "Calle Test 123",
        "tipo_documento": "DNI",
        "numero_documento": "12345678"
    }

@pytest.fixture
def sample_verificacion():
    """Datos de ejemplo para verificación"""
    return {
        "donante_id": 1,
        "resultado": "Aprobado",
        "observaciones": "Verificación de prueba"
    }

@pytest.fixture
def sample_contacto():
    """Datos de ejemplo para contacto"""
    return {
        "donante_id": 1,
        "nombre_contacto": "María Test",
        "telefono": "+57-301-234-5678",
        "relacion": "Hermana"
    }

@pytest.fixture
def sample_colaboracion():
    """Datos de ejemplo para colaboración"""
    return {
        "donante_id": 1,
        "tipo_colaboracion": "Mascota",
        "descripcion": "Donación de perro mestizo"
    }
