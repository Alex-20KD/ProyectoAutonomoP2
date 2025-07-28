"""
Tests de integración completos
"""

import pytest
from fastapi.testclient import TestClient

def test_flujo_completo_donante(client: TestClient):
    """Test flujo completo: crear donante, verificar, agregar contacto, historial"""
    
    # 1. Crear donante
    donante_data = {
        "nombre": "Ana García",
        "correo": "ana.garcia@email.com",
        "telefono": "+57-300-555-1234",
        "direccion": "Carrera 15 #20-30",
        "tipo_documento": "DNI",
        "numero_documento": "87654321"
    }
    
    donante_response = client.post("/api/v1/donantes/", json=donante_data)
    assert donante_response.status_code == 201
    donante_id = donante_response.json()["id"]
    
    # 2. Crear verificación
    verificacion_data = {
        "donante_id": donante_id,
        "resultado": "Aprobado",
        "observaciones": "Documentos en orden"
    }
    
    verif_response = client.post("/api/v1/verificaciones/", json=verificacion_data)
    assert verif_response.status_code == 201
    
    # 3. Agregar contacto de referencia
    contacto_data = {
        "donante_id": donante_id,
        "nombre_contacto": "Carlos García",
        "telefono": "+57-301-555-5678",
        "relacion": "Hermano"
    }
    
    contacto_response = client.post("/api/v1/contactos/", json=contacto_data)
    assert contacto_response.status_code == 201
    
    # 4. Registrar colaboración
    colaboracion_data = {
        "donante_id": donante_id,
        "tipo_colaboracion": "Mascota",
        "descripcion": "Donación de gato persa"
    }
    
    historial_response = client.post("/api/v1/historial/", json=colaboracion_data)
    assert historial_response.status_code == 201
    
    # 5. Verificar que todo está relacionado correctamente
    donante_final = client.get(f"/api/v1/donantes/{donante_id}")
    assert donante_final.status_code == 200
    
    verificaciones = client.get(f"/api/v1/verificaciones/donante/{donante_id}")
    assert len(verificaciones.json()) == 1
    
    contactos = client.get(f"/api/v1/contactos/donante/{donante_id}")
    assert len(contactos.json()) == 1
    
    historial = client.get(f"/api/v1/historial/donante/{donante_id}")
    assert len(historial.json()) == 1

def test_estadisticas_generales(client: TestClient):
    """Test obtener estadísticas de todos los módulos"""
    
    # Crear algunos datos de prueba
    donante_data = {
        "nombre": "Test Estadísticas",
        "correo": "stats@test.com",
        "telefono": "+57-300-999-0000",
        "tipo_documento": "DNI",
        "numero_documento": "99999999"
    }
    
    donante_response = client.post("/api/v1/donantes/", json=donante_data)
    donante_id = donante_response.json()["id"]
    
    # Verificaciones
    stats_verif = client.get("/api/v1/verificaciones/estadisticas/resumen")
    assert stats_verif.status_code == 200
    
    # Contactos
    stats_contactos = client.get("/api/v1/contactos/estadisticas/resumen")
    assert stats_contactos.status_code == 200
    
    # Historial
    stats_historial = client.get("/api/v1/historial/estadisticas/completas")
    assert stats_historial.status_code == 200

def test_health_check(client: TestClient):
    """Test health check del sistema"""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "websocket_connections" in data
