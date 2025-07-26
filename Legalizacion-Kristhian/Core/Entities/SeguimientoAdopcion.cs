// Core/Entities/SeguimientoAdopcion.cs
using System;

namespace Core.Entities
{
    public class SeguimientoAdopcion
    {
        // Llave Primaria
        public int Id { get; set; }

        // Atributos del seguimiento
        public DateTime FechaSeguimiento { get; set; }
        public string Observaciones { get; set; }
        public string RealizadoPor { get; set; } // Nombre del voluntario o empleado

        // Relación muchos a uno con Adopcion (Llave Foránea)
        public int AdopcionId { get; set; }
        public Adopcion Adopcion { get; set; }
    }
}