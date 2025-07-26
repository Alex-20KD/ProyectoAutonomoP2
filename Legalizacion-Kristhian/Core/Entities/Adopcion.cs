// Core/Entities/Adopcion.cs
using System.Collections.Generic; // Necesario para ICollection
using System;                  // Necesario para DateTime

namespace Core.Entities
{
    public class Adopcion
    {
        // Llave Primaria
        public int Id { get; set; }

        // Atributos de la adopción
        public DateTime FechaAdopcion { get; set; }
        public string Estado { get; set; } // Ej: "En Proceso", "Completada", "Cancelada"

        // Llaves Foráneas (asumiendo que tendrás entidades Mascota y Adoptante)
        public int MascotaId { get; set; }
        public int AdoptanteId { get; set; }

        // Propiedades de navegación para Entity Framework Core
        public ContratoAdopcion ContratoAdopcion { get; set; }
        public CertificadoPropiedad CertificadoPropiedad { get; set; }
        public ICollection<SeguimientoAdopcion> Seguimientos { get; set; }
    }
}