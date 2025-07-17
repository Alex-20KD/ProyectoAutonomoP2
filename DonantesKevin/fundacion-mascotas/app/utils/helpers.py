import re
import uuid
from datetime import date, datetime, timedelta
from typing import List, Dict, Any, Optional, Union
import unicodedata
import random
import string

def formatear_telefono(telefono: str, formato: str = "internacional") -> str:
    """
    Formatear número de teléfono
    
    Args:
        telefono: Número de teléfono
        formato: Tipo de formato (internacional, nacional, limpio)
        
    Returns:
        str: Teléfono formateado
    """
    # Limpiar el teléfono
    telefono_limpio = re.sub(r'[^\d+]', '', telefono)
    
    # Si no tiene código de país, asumir Colombia
    if not telefono_limpio.startswith('+') and not telefono_limpio.startswith('57'):
        if len(telefono_limpio) == 10:
            telefono_limpio = '57' + telefono_limpio
    
    if formato == "internacional":
        if telefono_limpio.startswith('57'):
            return f"+{telefono_limpio[:2]}-{telefono_limpio[2:5]}-{telefono_limpio[5:8]}-{telefono_limpio[8:]}"
    elif formato == "nacional":
        if telefono_limpio.startswith('57'):
            return f"{telefono_limpio[2:5]}-{telefono_limpio[5:8]}-{telefono_limpio[8:]}"
    elif formato == "limpio":
        return telefono_limpio
    
    return telefono

def generar_codigo_referencia(prefijo: str = "DON", longitud: int = 8) -> str:
    """
    Generar código de referencia único
    
    Args:
        prefijo: Prefijo del código
        longitud: Longitud del código numérico
        
    Returns:
        str: Código de referencia
    """
    numero = ''.join(random.choices(string.digits, k=longitud))
    timestamp = datetime.now().strftime("%y%m")
    return f"{prefijo}-{timestamp}-{numero}"

def calcular_edad(fecha_nacimiento: Union[date, str]) -> int:
    """
    Calcular edad a partir de fecha de nacimiento
    
    Args:
        fecha_nacimiento: Fecha de nacimiento
        
    Returns:
        int: Edad en años
    """
    if isinstance(fecha_nacimiento, str):
        fecha_nacimiento = datetime.strptime(fecha_nacimiento, '%Y-%m-%d').date()
    
    hoy = date.today()
    edad = hoy.year - fecha_nacimiento.year
    
    # Ajustar si no ha cumplido años este año
    if hoy.month < fecha_nacimiento.month or (hoy.month == fecha_nacimiento.month and hoy.day < fecha_nacimiento.day):
        edad -= 1
    
    return edad

def formatear_fecha(fecha: Union[date, datetime, str], formato: str = "dd/mm/yyyy") -> str:
    """
    Formatear fecha según el formato especificado
    
    Args:
        fecha: Fecha a formatear
        formato: Formato deseado
        
    Returns:
        str: Fecha formateada
    """
    if isinstance(fecha, str):
        fecha = datetime.strptime(fecha, '%Y-%m-%d').date()
    elif isinstance(fecha, datetime):
        fecha = fecha.date()
    
    formatos = {
        "dd/mm/yyyy": "%d/%m/%Y",
        "mm/dd/yyyy": "%m/%d/%Y",
        "yyyy-mm-dd": "%Y-%m-%d",
        "dd-mm-yyyy": "%d-%m-%Y",
        "dd de mmm de yyyy": "%d de %b de %Y",
        "dddd, dd de mmmm de yyyy": "%A, %d de %B de %Y"
    }
    
    formato_python = formatos.get(formato, "%d/%m/%Y")
    return fecha.strftime(formato_python)

def limpiar_texto(texto: str, mantener_espacios: bool = True, mantener_acentos: bool = True) -> str:
    """
    Limpiar y normalizar texto
    
    Args:
        texto: Texto a limpiar
        mantener_espacios: Si mantener espacios
        mantener_acentos: Si mantener acentos
        
    Returns:
        str: Texto limpio
    """
    if not texto:
        return ""
    
    # Normalizar espacios
    texto = re.sub(r'\s+', ' ', texto.strip())
    
    # Remover caracteres de control
    texto = ''.join(char for char in texto if ord(char) >= 32 or char in '\t\n\r')
    
    if not mantener_acentos:
        # Remover acentos
        texto = unicodedata.normalize('NFD', texto)
        texto = ''.join(char for char in texto if unicodedata.category(char) != 'Mn')
    
    if not mantener_espacios:
        texto = texto.replace(' ', '')
    
    return texto

def paginar_resultados(resultados: List[Any], pagina: int = 1, por_pagina: int = 10) -> Dict[str, Any]:
    """
    Paginar lista de resultados
    
    Args:
        resultados: Lista de resultados
        pagina: Número de página (empezando en 1)
        por_pagina: Elementos por página
        
    Returns:
        dict: Resultados paginados con metadatos
    """
    total = len(resultados)
    total_paginas = (total + por_pagina - 1) // por_pagina
    
    inicio = (pagina - 1) * por_pagina
    fin = inicio + por_pagina
    
    return {
        "datos": resultados[inicio:fin],
        "paginacion": {
            "pagina_actual": pagina,
            "por_pagina": por_pagina,
            "total_elementos": total,
            "total_paginas": total_paginas,
            "tiene_anterior": pagina > 1,
            "tiene_siguiente": pagina < total_paginas,
            "pagina_anterior": pagina - 1 if pagina > 1 else None,
            "pagina_siguiente": pagina + 1 if pagina < total_paginas else None
        }
    }

def generar_hash_unico() -> str:
    """
    Generar hash único para identificadores
    
    Returns:
        str: Hash único
    """
    return str(uuid.uuid4()).replace('-', '')[:16]

def convertir_a_slug(texto: str) -> str:
    """
    Convertir texto a slug URL-friendly
    
    Args:
        texto: Texto a convertir
        
    Returns:
        str: Slug generado
    """
    # Convertir a minúsculas y remover acentos
    slug = limpiar_texto(texto.lower(), mantener_acentos=False)
    
    # Reemplazar espacios y caracteres especiales con guiones
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[-\s]+', '-', slug)
    
    return slug.strip('-')

def validar_rango_fechas(fecha_inicio: date, fecha_fin: date) -> bool:
    """
    Validar que el rango de fechas sea válido
    
    Args:
        fecha_inicio: Fecha de inicio
        fecha_fin: Fecha de fin
        
    Returns:
        bool: True si el rango es válido
    """
    return fecha_inicio <= fecha_fin

def calcular_diferencia_dias(fecha1: date, fecha2: date) -> int:
    """
    Calcular diferencia en días entre dos fechas
    
    Args:
        fecha1: Primera fecha
        fecha2: Segunda fecha
        
    Returns:
        int: Diferencia en días
    """
    return abs((fecha2 - fecha1).days)

def formatear_numero(numero: Union[int, float], decimales: int = 2, separador_miles: str = ",") -> str:
    """
    Formatear número con separadores de miles
    
    Args:
        numero: Número a formatear
        decimales: Número de decimales
        separador_miles: Separador de miles
        
    Returns:
        str: Número formateado
    """
    if isinstance(numero, int):
        return f"{numero:,}".replace(",", separador_miles)
    else:
        return f"{numero:,.{decimales}f}".replace(",", separador_miles)

def obtener_iniciales(nombre_completo: str) -> str:
    """
    Obtener iniciales de un nombre completo
    
    Args:
        nombre_completo: Nombre completo
        
    Returns:
        str: Iniciales
    """
    palabras = nombre_completo.strip().split()
    iniciales = ''.join([palabra[0].upper() for palabra in palabras if palabra])
    return iniciales[:3]  # Máximo 3 iniciales

def es_email_valido(email: str) -> bool:
    """
    Verificar si un email tiene formato válido (versión simple)
    
    Args:
        email: Email a verificar
        
    Returns:
        bool: True si es válido
    """
    patron = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(patron, email))

def generar_password_temporal(longitud: int = 12) -> str:
    """
    Generar password temporal seguro
    
    Args:
        longitud: Longitud del password
        
    Returns:
        str: Password temporal
    """
    caracteres = string.ascii_letters + string.digits + "!@#$%^&*"
    password = ''.join(random.choices(caracteres, k=longitud))
    
    # Asegurar que tenga al menos un carácter de cada tipo
    if not any(c.islower() for c in password):
        password = password[:-1] + random.choice(string.ascii_lowercase)
    if not any(c.isupper() for c in password):
        password = password[:-1] + random.choice(string.ascii_uppercase)
    if not any(c.isdigit() for c in password):
        password = password[:-1] + random.choice(string.digits)
    
    return password

def truncar_texto(texto: str, longitud_maxima: int = 100, sufijo: str = "...") -> str:
    """
    Truncar texto a longitud máxima
    
    Args:
        texto: Texto a truncar
        longitud_maxima: Longitud máxima
        sufijo: Sufijo a agregar si se trunca
        
    Returns:
        str: Texto truncado
    """
    if len(texto) <= longitud_maxima:
        return texto
    
    return texto[:longitud_maxima - len(sufijo)] + sufijo

def convertir_bytes_a_humano(bytes_size: int) -> str:
    """
    Convertir bytes a formato legible por humanos
    
    Args:
        bytes_size: Tamaño en bytes
        
    Returns:
        str: Tamaño formateado
    """
    for unidad in ['B', 'KB', 'MB', 'GB', 'TB']:
        if bytes_size < 1024.0:
            return f"{bytes_size:.1f} {unidad}"
        bytes_size /= 1024.0
    return f"{bytes_size:.1f} PB"
