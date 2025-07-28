using System;
using System.Collections.Generic;

namespace ApiGateway.Models.Adopciones
{
    public class MascotaDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Especie { get; set; }
        public string Raza { get; set; }
        public int Edad { get; set; }
        public string Genero { get; set; }
        public string Descripcion { get; set; }
        public string FotoUrl { get; set; }
        public bool EstadoAdopcion { get; set; }
        public int? AdoptanteId { get; set; }
    }

    public class AdoptanteDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Direccion { get; set; }
        public DateTime FechaRegistro { get; set; }
    }

    public class SolicitudAdopcionDto
    {
        public int Id { get; set; }
        public int MascotaId { get; set; }
        public int AdoptanteId { get; set; }
        public DateTime FechaSolicitud { get; set; }
        public string Estado { get; set; }
        public string Motivo { get; set; }
        public MascotaDto Mascota { get; set; }
        public AdoptanteDto Adoptante { get; set; }
    }

    // DTO integrado que incluye información de legalización
    public class AdopcionCompletaDto
    {
        public SolicitudAdopcionDto SolicitudAdopcion { get; set; }
        public Models.Legalizacion.LegalizacionStatusDto EstadoLegalizacion { get; set; }
        public Models.Legalizacion.AdopcionDto ProcesoLegalizacion { get; set; }
    }

    public class CreateSolicitudAdopcionDto
    {
        public int MascotaId { get; set; }
        public int AdoptanteId { get; set; }
        public string Motivo { get; set; }
    }

    public class UpdateEstadoSolicitudDto
    {
        public string Estado { get; set; }
        public string Observaciones { get; set; }
    }
}
