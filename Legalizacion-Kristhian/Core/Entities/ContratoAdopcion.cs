// Core/Entities/ContratoAdopcion.cs
using System;

namespace Core.Entities
{
    public class ContratoAdopcion
    {
        // Llave Primaria
        public int Id { get; set; }

        // Atributos del contrato
        public string TerminosYCondiciones { get; set; }
        public DateTime FechaFirma { get; set; }
        public string FirmaAdoptanteUrl { get; set; } // URL a la imagen de la firma
        public string FirmaRefugioUrl { get; set; }   // URL a la imagen de la firma

        // Relación uno a uno con Adopcion (Llave Foránea)
        public int AdopcionId { get; set; }
        public Adopcion Adopcion { get; set; }
    }
}