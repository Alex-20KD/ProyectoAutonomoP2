"""
Script para inicializar la base de datos SQLite del módulo de donantes
"""
import sys
import os

# Agregar el directorio app al path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.config.database_sqlite import create_tables, engine
from sqlalchemy import text

# Importar todos los modelos para que SQLAlchemy los reconozca
from app.models import (
    Donante,
    MascotaDonada,
    VerificacionDonante,
    InformacionContacto,
    HistorialColaboracion
)

def init_database():
    """Inicializar la base de datos SQLite con las tablas necesarias"""
    
    print("Inicializando base de datos SQLite para módulo de donantes...")
    
    try:
        # Crear todas las tablas
        create_tables()
        
        # Verificar que las tablas se crearon
        with engine.connect() as conn:
            result = conn.execute(text("SELECT name FROM sqlite_master WHERE type='table';"))
            tables = result.fetchall()
            
            if tables:
                print("✅ Base de datos inicializada correctamente")
                print("Tablas creadas:")
                for table in tables:
                    print(f"  - {table[0]}")
            else:
                print("⚠️  No se crearon tablas. Verifique los modelos.")
        
        # Crear datos de prueba básicos si es necesario
        create_sample_data()
        
        print("🎉 Base de datos lista para usar")
        
    except Exception as e:
        print(f"❌ Error inicializando base de datos: {e}")
        return False
    
    return True

def create_sample_data():
    """Crear datos de prueba básicos"""
    try:
        with engine.connect() as conn:
            # Verificar si ya hay datos
            result = conn.execute(text("SELECT COUNT(*) FROM donantes;"))
            count = result.scalar()
            
            if count == 0:
                # Insertar donante de prueba
                conn.execute(text("""
                    INSERT INTO donantes (nombre, correo, telefono, direccion, tipo_documento, numero_documento, fecha_registro, estado)
                    VALUES ('Juan Pérez', 'juan.perez@email.com', '555-0123', 'Calle Principal 123', 'DNI', '12345678', date('now'), 'activo')
                """))
                
                conn.execute(text("""
                    INSERT INTO donantes (nombre, correo, telefono, direccion, tipo_documento, numero_documento, fecha_registro, estado)
                    VALUES ('María García', 'maria.garcia@email.com', '555-0456', 'Avenida Secundaria 456', 'DNI', '87654321', date('now'), 'activo')
                """))
                
                conn.commit()
                print("✅ Datos de prueba creados")
            else:
                print("ℹ️  La base de datos ya contiene datos")
                
    except Exception as e:
        print(f"⚠️  Error creando datos de prueba: {e}")

if __name__ == "__main__":
    init_database()
