import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Database - Cambiado a SQLite para compatibilidad
    DB_NAME = os.getenv("DB_NAME", "donantes.sqlite")
    DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), DB_NAME)
    
    # Server
    PORT = int(os.getenv("PORT", 8000))
    HOST = os.getenv("HOST", "0.0.0.0")
    
    # WebSocket
    WS_PORT = int(os.getenv("WS_PORT", 8001))
    
    # Environment
    DEBUG = os.getenv("DEBUG", "True").lower() == "true"
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    
    @property
    def database_url(self):
        return f"sqlite:///{self.DB_PATH}"
    
    @property
    def async_database_url(self):
        return f"sqlite+aiosqlite:///{self.DB_PATH}"

settings = Settings()
