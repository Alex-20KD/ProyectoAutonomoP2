import re
from datetime import date, datetime
from typing import Optional, Union
from email_validator import validate_email, EmailNotValidError

class ValidationError(Exception):
    """Excepción personalizada para errores de validación"""
    pass

def validar_email(email: str) -> bool:
    """
    Validar formato de email
    
    Args:
        email: Email a validar
        
    Returns:
        bool: True si es válido
        
    Raises:
        ValidationError: Si el email no es válido
    """
    try:
        validate_email(email)
        return True
    except EmailNotValidError as e:
        raise ValidationError(f"Email inválido: {str(e)}")

def validar_telefono(telefono: str, pais: str = "CO") -> bool:
    """
    Validar formato de teléfono
    
    Args:
        telefono: Número de teléfono
        pais: Código de país (por defecto Colombia)
        
    Returns:
        bool: True si es válido
        
    Raises:
        ValidationError: Si el teléfono no es válido
    """
    # Limpiar el teléfono de espacios y caracteres especiales
    telefono_limpio = re.sub(r'[^\d+]', '', telefono)
    
    if pais == "CO":
        # Patrones para Colombia
        patrones = [
            r'^\+57[0-9]{10}$',  # +57XXXXXXXXXX
            r'^57[0-9]{10}$',    # 57XXXXXXXXXX
            r'^[0-9]{10}$',      # XXXXXXXXXX
            r'^3[0-9]{9}$'       # 3XXXXXXXXX (celulares)
        ]
        
        for patron in patrones:
            if re.match(patron, telefono_limpio):
                return True
        
        raise ValidationError("Formato de teléfono inválido para Colombia")
    
    # Validación genérica
    if len(telefono_limpio) < 7 or len(telefono_limpio) > 15:
        raise ValidationError("El teléfono debe tener entre 7 y 15 dígitos")
    
    return True

def validar_documento(numero_documento: str, tipo_documento: str) -> bool:
    """
    Validar número de documento según el tipo
    
    Args:
        numero_documento: Número del documento
        tipo_documento: Tipo de documento (DNI, Pasaporte, etc.)
        
    Returns:
        bool: True si es válido
        
    Raises:
        ValidationError: Si el documento no es válido
    """
    numero_limpio = re.sub(r'[^\w]', '', numero_documento.upper())
    
    if tipo_documento.upper() == "DNI":
        # Validación para DNI (Colombia - Cédula)
        if not re.match(r'^[0-9]{6,10}$', numero_limpio):
            raise ValidationError("DNI debe tener entre 6 y 10 dígitos")
    
    elif tipo_documento.upper() == "PASAPORTE":
        # Validación para pasaporte
        if not re.match(r'^[A-Z0-9]{6,12}$', numero_limpio):
            raise ValidationError("Pasaporte debe tener entre 6 y 12 caracteres alfanuméricos")
    
    elif tipo_documento.upper() == "TARJETA_IDENTIDAD":
        # Validación para tarjeta de identidad
        if not re.match(r'^[0-9]{10,11}$', numero_limpio):
            raise ValidationError("Tarjeta de identidad debe tener 10 u 11 dígitos")
    
    else:
        # Validación genérica
        if len(numero_limpio) < 5 or len(numero_limpio) > 15:
            raise ValidationError("Documento debe tener entre 5 y 15 caracteres")
    
    return True

def validar_fecha(fecha: Union[str, date, datetime], fecha_minima: Optional[date] = None, fecha_maxima: Optional[date] = None) -> bool:
    """
    Validar fecha y rangos opcionales
    
    Args:
        fecha: Fecha a validar
        fecha_minima: Fecha mínima permitida
        fecha_maxima: Fecha máxima permitida
        
    Returns:
        bool: True si es válida
        
    Raises:
        ValidationError: Si la fecha no es válida
    """
    try:
        if isinstance(fecha, str):
            # Intentar parsear diferentes formatos
            formatos = ['%Y-%m-%d', '%d/%m/%Y', '%d-%m-%Y']
            fecha_obj = None
            
            for formato in formatos:
                try:
                    fecha_obj = datetime.strptime(fecha, formato).date()
                    break
                except ValueError:
                    continue
            
            if fecha_obj is None:
                raise ValidationError("Formato de fecha inválido. Use YYYY-MM-DD, DD/MM/YYYY o DD-MM-YYYY")
        
        elif isinstance(fecha, datetime):
            fecha_obj = fecha.date()
        elif isinstance(fecha, date):
            fecha_obj = fecha
        else:
            raise ValidationError("Tipo de fecha no soportado")
        
        # Validar rangos
        if fecha_minima and fecha_obj < fecha_minima:
            raise ValidationError(f"La fecha no puede ser anterior a {fecha_minima}")
        
        if fecha_maxima and fecha_obj > fecha_maxima:
            raise ValidationError(f"La fecha no puede ser posterior a {fecha_maxima}")
        
        return True
        
    except ValueError as e:
        raise ValidationError(f"Fecha inválida: {str(e)}")

def validar_estado_donante(estado: str) -> bool:
    """
    Validar estado de donante
    
    Args:
        estado: Estado a validar
        
    Returns:
        bool: True si es válido
        
    Raises:
        ValidationError: Si el estado no es válido
    """
    estados_validos = ["Activo", "Inactivo", "Suspendido"]
    
    if estado not in estados_validos:
        raise ValidationError(f"Estado inválido. Debe ser uno de: {', '.join(estados_validos)}")
    
    return True

def validar_resultado_verificacion(resultado: str) -> bool:
    """
    Validar resultado de verificación
    
    Args:
        resultado: Resultado a validar
        
    Returns:
        bool: True si es válido
        
    Raises:
        ValidationError: Si el resultado no es válido
    """
    resultados_validos = ["Aprobado", "Observación", "Rechazado"]
    
    if resultado not in resultados_validos:
        raise ValidationError(f"Resultado inválido. Debe ser uno de: {', '.join(resultados_validos)}")
     
        raise ValidationError(f"Resultado inválido. Debe ser uno de: {', '.join(resultados_validos)}")
    
    return True

def validar_tipo_colaboracion(tipo: str) -> bool:
    """
    Validar tipo de colaboración
    
    Args:
        tipo: Tipo de colaboración a validar
        
    Returns:
        bool: True si es válido
        
    Raises:
        ValidationError: Si el tipo no es válido
    """
    tipos_validos = ["Mascota", "Económica", "Voluntariado", "Material", "Transporte", "Otro"]
    
    if tipo not in tipos_validos:
        raise ValidationError(f"Tipo de colaboración inválido. Debe ser uno de: {', '.join(tipos_validos)}")
    
    return True

def validar_longitud_texto(texto: str, min_length: int = 0, max_length: int = 1000, campo: str = "texto") -> bool:
    """
    Validar longitud de texto
    
    Args:
        texto: Texto a validar
        min_length: Longitud mínima
        max_length: Longitud máxima
        campo: Nombre del campo para el mensaje de error
        
    Returns:
        bool: True si es válido
        
    Raises:
        ValidationError: Si la longitud no es válida
    """
    if len(texto) < min_length:
        raise ValidationError(f"{campo} debe tener al menos {min_length} caracteres")
    
    if len(texto) > max_length:
        raise ValidationError(f"{campo} no puede tener más de {max_length} caracteres")
    
    return True

def validar_caracteres_especiales(texto: str, permitir_especiales: bool = True) -> bool:
    """
    Validar caracteres especiales en texto
    
    Args:
        texto: Texto a validar
        permitir_especiales: Si se permiten caracteres especiales
        
    Returns:
        bool: True si es válido
        
    Raises:
        ValidationError: Si contiene caracteres no permitidos
    """
    if not permitir_especiales:
        if re.search(r'[<>{}[\]\\|`~!@#$%^&*()+=]', texto):
            raise ValidationError("El texto contiene caracteres especiales no permitidos")
    
    # Validar que no contenga scripts maliciosos
    patrones_maliciosos = [
        r'<script.*?>.*?</script>',
        r'javascript:',
        r'on\w+\s*=',
        r'<iframe.*?>',
        r'<object.*?>'
    ]
    
    for patron in patrones_maliciosos:
        if re.search(patron, texto, re.IGNORECASE):
            raise ValidationError("El texto contiene contenido potencialmente malicioso")
    
    return True
