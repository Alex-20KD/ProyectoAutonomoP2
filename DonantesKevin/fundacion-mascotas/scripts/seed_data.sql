-- Datos de prueba para el sistema de donantes

-- Insertar donantes de ejemplo
INSERT INTO donantes (nombre, correo, telefono, direccion, tipo_documento, numero_documento, estado) VALUES
('María González', 'maria.gonzalez@email.com', '+57-300-123-4567', 'Calle 123 #45-67, Bogotá', 'DNI', '12345678', 'Activo'),
('Carlos Rodríguez', 'carlos.rodriguez@email.com', '+57-301-234-5678', 'Carrera 89 #12-34, Medellín', 'Pasaporte', 'AB123456', 'Activo'),
('Ana Martínez', 'ana.martinez@email.com', '+57-302-345-6789', 'Avenida 56 #78-90, Cali', 'DNI', '87654321', 'Activo'),
('Luis Hernández', 'luis.hernandez@email.com', '+57-303-456-7890', 'Calle 34 #56-78, Barranquilla', 'DNI', '11223344', 'Inactivo'),
('Carmen López', 'carmen.lopez@email.com', '+57-304-567-8901', 'Carrera 12 #34-56, Cartagena', 'DNI', '55667788', 'Activo');

-- Insertar mascotas donadas
INSERT INTO mascotas_donadas (donante_id, mascota_id, motivo_donacion, estado_revision) VALUES
(1, 101, 'Mudanza a apartamento que no permite mascotas', 'Aceptada'),
(1, 102, 'Problemas de salud del dueño', 'Aceptada'),
(2, 103, 'Viaje de trabajo prolongado', 'Pendiente'),
(3, 104, 'Situación económica difícil', 'Aceptada'),
(4, 105, 'Alergias familiares', 'Rechazada'),
(5, 106, 'Falta de tiempo para cuidado adecuado', 'Pendiente');

-- Insertar verificaciones de donantes
INSERT INTO verificaciones_donante (donante_id, resultado, observaciones) VALUES
(1, 'Aprobado', 'Documentos en orden, referencias verificadas'),
(2, 'Aprobado', 'Verificación exitosa, donante confiable'),
(3, 'Aprobado', 'Sin observaciones'),
(4, 'Observación', 'Requiere seguimiento por cambio de dirección'),
(5, 'Aprobado', 'Primera donación, referencias positivas');

-- Insertar información de contacto
INSERT INTO informacion_contacto (donante_id, nombre_contacto, telefono, relacion) VALUES
(1, 'Pedro González', '+57-310-111-2222', 'Hermano'),
(1, 'Laura Pérez', '+57-311-333-4444', 'Amiga'),
(2, 'Sofia Rodríguez', '+57-312-555-6666', 'Esposa'),
(3, 'Miguel Martínez', '+57-313-777-8888', 'Padre'),
(4, 'Elena Hernández', '+57-314-999-0000', 'Madre'),
(5, 'Roberto López', '+57-315-111-3333', 'Esposo');

-- Insertar historial de colaboración
INSERT INTO historial_colaboracion (donante_id, tipo_colaboracion, descripcion) VALUES
(1, 'Mascota', 'Donación de perro mestizo de 3 años'),
(1, 'Mascota', 'Donación de gato siamés de 2 años'),
(1, 'Económica', 'Donación monetaria de $100.000 COP'),
(2, 'Mascota', 'Donación de cachorro labrador'),
(2, 'Voluntariado', 'Participación en jornada de adopción'),
(3, 'Mascota', 'Donación de gato persa'),
(3, 'Económica', 'Donación de alimento para mascotas'),
(4, 'Mascota', 'Intento de donación (rechazada)'),
(5, 'Mascota', 'Donación de conejo doméstico'),
(5, 'Voluntariado', 'Ayuda en campaña de esterilización');

-- Verificar datos insertados
SELECT 'Donantes insertados:' as info, COUNT(*) as cantidad FROM donantes
UNION ALL
SELECT 'Mascotas donadas:', COUNT(*) FROM mascotas_donadas
UNION ALL
SELECT 'Verificaciones:', COUNT(*) FROM verificaciones_donante
UNION ALL
SELECT 'Contactos:', COUNT(*) FROM informacion_contacto
UNION ALL
SELECT 'Historial:', COUNT(*) FROM historial_colaboracion;
