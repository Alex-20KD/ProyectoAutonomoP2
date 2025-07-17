-- Conectar a la base de datos fundacion_mascotas
\c fundacion_mascotas;

-- Tabla de donantes
CREATE TABLE IF NOT EXISTS donantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    direccion TEXT,
    tipo_documento VARCHAR(50) NOT NULL,
    numero_documento VARCHAR(50) UNIQUE NOT NULL,
    fecha_registro DATE DEFAULT CURRENT_DATE,
    estado VARCHAR(20) DEFAULT 'Activo' CHECK (estado IN ('Activo', 'Inactivo', 'Suspendido')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de mascotas donadas
CREATE TABLE IF NOT EXISTS mascotas_donadas (
    id SERIAL PRIMARY KEY,
    donante_id INTEGER NOT NULL REFERENCES donantes(id) ON DELETE CASCADE,
    mascota_id INTEGER NOT NULL, -- FK a tabla mascotas de otro módulo
    fecha_donacion DATE DEFAULT CURRENT_DATE,
    motivo_donacion TEXT,
    estado_revision VARCHAR(20) DEFAULT 'Pendiente' CHECK (estado_revision IN ('Pendiente', 'Aceptada', 'Rechazada')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de verificaciones de donante
CREATE TABLE IF NOT EXISTS verificaciones_donante (
    id SERIAL PRIMARY KEY,
    donante_id INTEGER NOT NULL REFERENCES donantes(id) ON DELETE CASCADE,
    fecha_verificacion DATE DEFAULT CURRENT_DATE,
    resultado VARCHAR(20) NOT NULL CHECK (resultado IN ('Aprobado', 'Observación', 'Rechazado')),
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de información de contacto
CREATE TABLE IF NOT EXISTS informacion_contacto (
    id SERIAL PRIMARY KEY,
    donante_id INTEGER NOT NULL REFERENCES donantes(id) ON DELETE CASCADE,
    nombre_contacto VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    relacion VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de historial de colaboración
CREATE TABLE IF NOT EXISTS historial_colaboracion (
    id SERIAL PRIMARY KEY,
    donante_id INTEGER NOT NULL REFERENCES donantes(id) ON DELETE CASCADE,
    tipo_colaboracion VARCHAR(50) NOT NULL,
    descripcion TEXT,
    fecha_colaboracion DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_donantes_correo ON donantes(correo);
CREATE INDEX IF NOT EXISTS idx_donantes_documento ON donantes(numero_documento);
CREATE INDEX IF NOT EXISTS idx_donantes_estado ON donantes(estado);
CREATE INDEX IF NOT EXISTS idx_mascotas_donante ON mascotas_donadas(donante_id);
CREATE INDEX IF NOT EXISTS idx_mascotas_estado ON mascotas_donadas(estado_revision);
CREATE INDEX IF NOT EXISTS idx_verificaciones_donante ON verificaciones_donante(donante_id);
CREATE INDEX IF NOT EXISTS idx_contactos_donante ON informacion_contacto(donante_id);
CREATE INDEX IF NOT EXISTS idx_historial_donante ON historial_colaboracion(donante_id);
CREATE INDEX IF NOT EXISTS idx_historial_tipo ON historial_colaboracion(tipo_colaboracion);

-- Triggers para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_donantes_updated_at BEFORE UPDATE ON donantes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mascotas_updated_at BEFORE UPDATE ON mascotas_donadas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_verificaciones_updated_at BEFORE UPDATE ON verificaciones_donante
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contactos_updated_at BEFORE UPDATE ON informacion_contacto
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_historial_updated_at BEFORE UPDATE ON historial_colaboracion
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comentarios en las tablas
COMMENT ON TABLE donantes IS 'Tabla principal de donantes de la fundación';
COMMENT ON TABLE mascotas_donadas IS 'Registro de mascotas donadas por cada donante';
COMMENT ON TABLE verificaciones_donante IS 'Verificaciones de antecedentes de donantes';
COMMENT ON TABLE informacion_contacto IS 'Contactos de referencia de los donantes';
COMMENT ON TABLE historial_colaboracion IS 'Historial completo de colaboraciones del donante';
