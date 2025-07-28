import asyncio
import asyncpg
import os
from pathlib import Path
from app.config.settings import settings

async def create_database():
    """Crear la base de datos si no existe"""
    try:
        # Conectar como superusuario para crear la base de datos
        conn = await asyncpg.connect(
            host=settings.DB_HOST,
            port=settings.DB_PORT,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
            database='postgres'  # Conectar a la base por defecto
        )
        
        # Verificar si la base de datos existe
        exists = await conn.fetchval(
            "SELECT 1 FROM pg_database WHERE datname = $1",
            settings.DB_NAME
        )
        
        if not exists:
            await conn.execute(f'CREATE DATABASE "{settings.DB_NAME}"')
            print(f"✅ Base de datos '{settings.DB_NAME}' creada exitosamente")
        else:
            print(f"ℹ️  Base de datos '{settings.DB_NAME}' ya existe")
        
        await conn.close()
        
    except Exception as e:
        print(f"❌ Error creando base de datos: {e}")
        return False
    
    return True

async def run_sql_file(file_path: Path):
    """Ejecutar un archivo SQL"""
    try:
        conn = await asyncpg.connect(
            host=settings.DB_HOST,
            port=settings.DB_PORT,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
            database=settings.DB_NAME
        )

        with open(file_path, 'r', encoding='utf-8') as file:
            sql_content = file.read()

        # Ejecutar todo el contenido de una sola vez
        await conn.execute(sql_content)

        await conn.close()
        print(f"✅ Ejecutado: {file_path.name}")

    except Exception as e:
        print(f"❌ Error ejecutando {file_path.name}: {e}")
        return False

    return True

async def main():
    """Función principal"""
    print("🚀 Iniciando configuración de base de datos...")
    
    # Crear base de datos
    if not await create_database():
        return
    
    # Ejecutar scripts SQL
    scripts_dir = Path("scripts")
    
    # Orden de ejecución
    sql_files = [
        "create_tables.sql",
        "seed_data.sql"
    ]
    
    for sql_file in sql_files:
        file_path = scripts_dir / sql_file
        if file_path.exists():
            await run_sql_file(file_path)
        else:
            print(f"⚠️  Archivo no encontrado: {sql_file}")
    
    print("✅ Configuración de base de datos completada")

if __name__ == "__main__":
    asyncio.run(main())
