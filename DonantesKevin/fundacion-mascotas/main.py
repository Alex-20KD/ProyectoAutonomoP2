import logging

from app.config.settings import settings
from app.config.database import engine, Base

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)