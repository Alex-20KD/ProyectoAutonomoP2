// Core/Entities/DocumentacionMascota.cs
using System;

namespace Core.Entities
{
    public class DocumentacionMascota
    {
        // Llave Primaria
        public int Id { get; set; }

        // Atributos del documento
        public string TipoDocumento { get; set; } // Ej: "Carnet de Vacunación", "Historia Clínica"
        public string UrlDocumento { get; set; }  // URL al archivo escaneado
        public DateTime FechaEmision { get; set; }

        // Llave Foránea (asumiendo que tendrás una entidad Mascota)
        public int MascotaId { get; set; }
    }
}