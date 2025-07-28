"""
Script para ejecutar el WebSocket Central
"""

import asyncio
import sys
import os

# Agregar la ruta del websocket central
sys.path.append(os.path.join(os.path.dirname(__file__), '../../websocket'))

try:
    from main import main
    
    if __name__ == "__main__":
        print("🚀 Iniciando WebSocket Central...")
        print("   - Clientes: ws://localhost:8001")
        print("   - Módulos: ws://localhost:8002")
        asyncio.run(main())
        
except ImportError as e:
    print(f"❌ Error: No se pudo importar el WebSocket Central: {e}")
    print("   Asegúrate de que el archivo websocket/main.py existe")
    print("   Ejecuta desde: DonantesKevin/fundacion-mascotas/")
