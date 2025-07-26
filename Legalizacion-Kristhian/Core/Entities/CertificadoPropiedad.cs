// Core/Entities/CertificadoPropiedad.cs
using System;

namespace Core.Entities
{
    public class CertificadoPropiedad
    {
        // Llave Primaria
        public int Id { get; set; }

        // Atributos del certificado
        public string NumeroCertificado { get; set; }
        public DateTime FechaEmision { get; set; }
        public string EntidadEmisora { get; set; } // Ej: "Refugio Animal XYZ"

        // Relación uno a uno con Adopcion (Llave Foránea)
        public int AdopcionId { get; set; }
        public Adopcion Adopcion { get; set; }
    }
}