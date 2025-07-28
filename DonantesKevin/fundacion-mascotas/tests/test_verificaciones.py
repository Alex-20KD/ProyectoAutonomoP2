"""
Tests para el módulo de verificaciones
"""

import pytest
from fastapi.testclient import TestClient

def test_crear_verificacion(client: TestClient, sample_donante, sample_verificacion):
    """Test crear verificación"""
    # Crear donante primero
    donante_response = client.post("/api/v1/donantes/", json=sample_donante)
    donante_id = donante_response.json()["id"]
    
    # Crear verificación
    sample_verificacion["donante_id"] = donante_id
    response = client.post("/api/v1/verificaciones/", json=sample_verificacion)
    assert response.status_code == 201
    data = response.json()
    assert data["resultado"] == sample_verificacion["resultado"]
    assert data["donante_id"] == donante_id

def test_listar_verificaciones(client: TestClient, sample_donante, sample_verificacion):
    """Test listar verificaciones"""
    # Crear donante y verificación
    donante_response = client.post("/api/v1/donantes/", json=sample_donante)
    donante_id = donante_response.json()["id"]
    sample_verificacion["donante_id"] = donante_id
    client.post("/api/v1/verificaciones/", json=sample_verificacion)
    
    # Listar verificaciones
    response = client.get("/api/v1/verificaciones/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1

def test_obtener_verificaciones_por_donante(client: TestClient, sample_donante, sample_verificacion):
    """Test obtener verificaciones por donante"""
    # Crear donante y verificación
    donante_response = client.post("/api/v1/donantes/", json=sample_donante)
    donante_id = donante_response.json()["id"]
    sample_verificacion["donante_id"] = donante_id
    client.post("/api/v1/verificaciones/", json=sample_verificacion)
    
    # Obtener verificaciones del donante
    response = client.get(f"/api/v1/verificaciones/donante/{donante_id}")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert data[0]["donante_id"] == donante_id

def test_revisar_verificacion(client: TestClient, sample_donante, sample_verificacion):
    """Test revisar verificación"""
    # Crear donante y verificación
    donante_response = client.post("/api/v1/donantes/", json=sample_donante)
    donante_id = donante_response.json()["id"]
    sample_verificacion["donante_id"] = donante_id
    verif_response = client.post("/api/v1/verificaciones/", json=sample_verificacion)
    verif_id = verif_response.json()["id"]
    
    # Revisar verificación
    response = client.patch(f"/api/v1/verificaciones/{verif_id}/revisar?nuevo_resultado=Rechazado&observaciones=Test")
    assert response.status_code == 200
    data = response.json()
    assert "Verificación rechazado" in data["message"]

def test_estadisticas_verificaciones(client: TestClient):
    """Test obtener estadísticas de verificaciones"""
    response = client.get("/api/v1/verificaciones/estadisticas/resumen")
    assert response.status_code == 200
    data = response.json()
    assert "total" in data
    assert "aprobadas" in data
    assert "tasa_aprobacion" in data
