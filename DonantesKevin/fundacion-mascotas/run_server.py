#!/usr/bin/env python3
"""
Script para ejecutar el servidor de donantes
"""

import uvicorn
import sys
import os

# Agregar el directorio actual al path
sys.path.insert(0, os.path.dirname(__file__))

if __name__ == "__main__":
    # Importar la aplicación
    from main import app
    
    # Configurar y ejecutar el servidor
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=False,
        log_level="info"
    )
