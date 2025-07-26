// Application/Interfaces/Services/ICertificadoPropiedadService.cs
using Core.Entities;

namespace Application.Interfaces.Services
{
    public interface ICertificadoPropiedadService
    {
        Task<CertificadoPropiedad> CrearCertificadoAsync(CertificadoPropiedad nuevoCertificado);
        Task<CertificadoPropiedad> ObtenerCertificadoPorIdAsync(int id);
        Task<IEnumerable<CertificadoPropiedad>> ObtenerTodosLosCertificadosAsync();
        Task<bool> ActualizarCertificadoAsync(CertificadoPropiedad certificadoAActualizar);
        Task<bool> EliminarCertificadoAsync(int id);
    }
}