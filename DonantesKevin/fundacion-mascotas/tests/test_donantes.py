"""
Tests para el módulo de donantes
"""

import pytest
from fastapi.testclient import TestClient

def test_crear_donante(client: TestClient, sample_donante):
    """Test crear donante"""
    response = client.post("/api/v1/donantes/", json=sample_donante)
    assert response.status_code == 201
    data = response.json()
    assert data["nombre"] == sample_donante["nombre"]
    assert data["correo"] == sample_donante["correo"]
    assert "id" in data

def test_listar_donantes(client: TestClient, sample_donante):
    """Test listar donantes"""
    # Crear donante primero
    client.post("/api/v1/donantes/", json=sample_donante)
    
    # Listar donantes
    response = client.get("/api/v1/donantes/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert data[0]["nombre"] == sample_donante["nombre"]

def test_obtener_donante(client: TestClient, sample_donante):
    """Test obtener donante por ID"""
    # Crear donante
    create_response = client.post("/api/v1/donantes/", json=sample_donante)
    donante_id = create_response.json()["id"]
    
    # Obtener donante
    response = client.get(f"/api/v1/donantes/{donante_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == donante_id
    assert data["nombre"] == sample_donante["nombre"]

def test_actualizar_donante(client: TestClient, sample_donante):
    """Test actualizar donante"""
    # Crear donante
    create_response = client.post("/api/v1/donantes/", json=sample_donante)
    donante_id = create_response.json()["id"]
    
    # Actualizar donante
    update_data = {"nombre": "Juan Pérez Actualizado"}
    response = client.put(f"/api/v1/donantes/{donante_id}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["nombre"] == "Juan Pérez Actualizado"

def test_cambiar_estado_donante(client: TestClient, sample_donante):
    """Test cambiar estado de donante"""
    # Crear donante
    create_response = client.post("/api/v1/donantes/", json=sample_donante)
    donante_id = create_response.json()["id"]
    
    # Cambiar estado
    response = client.patch(f"/api/v1/donantes/{donante_id}/estado?nuevo_estado=Inactivo")
    assert response.status_code == 200
    data = response.json()
    assert "Estado cambiado" in data["message"]

def test_buscar_donantes(client: TestClient, sample_donante):
    """Test buscar donantes"""
    # Crear donante
    client.post("/api/v1/donantes/", json=sample_donante)
    
    # Buscar por nombre
    response = client.get("/api/v1/donantes/buscar/Juan")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1

def test_crear_donante_duplicado(client: TestClient, sample_donante):
    """Test crear donante con correo duplicado"""
    # Crear primer donante
    client.post("/api/v1/donantes/", json=sample_donante)
    
    # Intentar crear duplicado
    response = client.post("/api/v1/donantes/", json=sample_donante)
    assert response.status_code == 400
    assert "Ya existe un donante" in response.json()["detail"]

def test_donante_no_encontrado(client: TestClient):
    """Test obtener donante que no existe"""
    response = client.get("/api/v1/donantes/999")
    assert response.status_code == 404
    assert "Donante no encontrado" in response.json()["detail"]
