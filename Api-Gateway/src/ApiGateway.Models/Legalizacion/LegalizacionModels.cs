using System;
using System.Collections.Generic;

namespace ApiGateway.Models.Legalizacion
{
    public class AdopcionDto
    {
        public int Id { get; set; }
        public DateTime FechaAdopcion { get; set; }
        public string Estado { get; set; }
        public int MascotaId { get; set; }
        public int AdoptanteId { get; set; }
        public ContratoAdopcionDto ContratoAdopcion { get; set; }
        public CertificadoPropiedadDto CertificadoPropiedad { get; set; }
        public List<SeguimientoAdopcionDto> Seguimientos { get; set; }
    }

    public class ContratoAdopcionDto
    {
        public int Id { get; set; }
        public string TerminosYCondiciones { get; set; }
        public DateTime FechaFirma { get; set; }
        public string FirmaAdoptanteUrl { get; set; }
        public string FirmaRefugioUrl { get; set; }
        public int AdopcionId { get; set; }
    }

    public class CertificadoPropiedadDto
    {
        public int Id { get; set; }
        public string NumeroRegistro { get; set; }
        public DateTime FechaEmision { get; set; }
        public string AutoridadEmisora { get; set; }
        public int AdopcionId { get; set; }
    }

    public class SeguimientoAdopcionDto
    {
        public int Id { get; set; }
        public DateTime FechaSeguimiento { get; set; }
        public string Observaciones { get; set; }
        public string Estado { get; set; }
        public int AdopcionId { get; set; }
    }

    public class DocumentacionMascotaDto
    {
        public int Id { get; set; }
        public string TipoDocumento { get; set; }
        public string UrlDocumento { get; set; }
        public DateTime FechaSubida { get; set; }
        public int MascotaId { get; set; }
    }

    // DTOs para crear nuevos registros
    public class CreateAdopcionDto
    {
        public DateTime FechaAdopcion { get; set; }
        public string Estado { get; set; }
        public int MascotaId { get; set; }
        public int AdoptanteId { get; set; }
    }

    public class CreateContratoAdopcionDto
    {
        public string TerminosYCondiciones { get; set; }
        public DateTime FechaFirma { get; set; }
        public string FirmaAdoptanteUrl { get; set; }
        public string FirmaRefugioUrl { get; set; }
        public int AdopcionId { get; set; }
    }

    public class LegalizacionStatusDto
    {
        public int AdopcionId { get; set; }
        public string EstadoLegalizacion { get; set; }
        public bool ContratoFirmado { get; set; }
        public bool CertificadoEmitido { get; set; }
        public DateTime? FechaFinalizacion { get; set; }
        public List<string> DocumentosPendientes { get; set; }
    }
}
