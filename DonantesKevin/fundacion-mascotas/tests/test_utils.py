"""
Tests para utilidades
"""

import pytest
from datetime import date
from app.utils.validators import (
    validar_email, validar_telefono, validar_documento, 
    validar_fecha, ValidationError
)
from app.utils.helpers import (
    formatear_telefono, generar_codigo_referencia,
    calcular_edad, formatear_fecha, limpiar_texto
)

class TestValidators:
    """Tests para validadores"""
    
    def test_validar_email_valido(self):
        """Test email válido"""
        assert validar_email("test@example.com") == True
    
    def test_validar_email_invalido(self):
        """Test email inválido"""
        with pytest.raises(ValidationError):
            validar_email("email_invalido")
    
    def test_validar_telefono_colombia(self):
        """Test teléfono Colombia válido"""
        assert validar_telefono("+57-300-123-4567") == True
        assert validar_telefono("3001234567") == True
    
    def test_validar_telefono_invalido(self):
        """Test teléfono inválido"""
        with pytest.raises(ValidationError):
            validar_telefono("123")
    
    def test_validar_documento_dni(self):
        """Test DNI válido"""
        assert validar_documento("12345678", "DNI") == True
    
    def test_validar_documento_invalido(self):
        """Test documento inválido"""
        with pytest.raises(ValidationError):
            validar_documento("123", "DNI")
    
    def test_validar_fecha_valida(self):
        """Test fecha válida"""
        assert validar_fecha("2023-01-01") == True
        assert validar_fecha(date(2023, 1, 1)) == True
    
    def test_validar_fecha_invalida(self):
        """Test fecha inválida"""
        with pytest.raises(ValidationError):
            validar_fecha("fecha_invalida")

class TestHelpers:
    """Tests para helpers"""
    
    def test_formatear_telefono(self):
        """Test formatear teléfono"""
        resultado = formatear_telefono("573001234567", "internacional")
        assert "+57" in resultado
    
    def test_generar_codigo_referencia(self):
        """Test generar código de referencia"""
        codigo = generar_codigo_referencia("DON", 8)
        assert codigo.startswith("DON-")
        assert len(codigo.split("-")) == 3
    
    def test_calcular_edad(self):
        """Test calcular edad"""
        fecha_nacimiento = date(2000, 1, 1)
        edad = calcular_edad(fecha_nacimiento)
        assert edad >= 23  # Depende del año actual
    
    def test_formatear_fecha(self):
        """Test formatear fecha"""
        fecha = date(2023, 12, 25)
        resultado = formatear_fecha(fecha, "dd/mm/yyyy")
        assert resultado == "25/12/2023"
    
    def test_limpiar_texto(self):
        """Test limpiar texto"""
        texto_sucio = "  Texto   con    espacios  "
        resultado = limpiar_texto(texto_sucio)
        assert resultado == "Texto con espacios"
