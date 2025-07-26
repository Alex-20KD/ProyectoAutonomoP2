// Application/Services/CertificadoPropiedadService.cs
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Core.Entities;

namespace Application.Services
{
    public class CertificadoPropiedadService : ICertificadoPropiedadService
    {
        private readonly ICertificadoPropiedadRepository _certificadoRepository;

        public CertificadoPropiedadService(ICertificadoPropiedadRepository certificadoRepository)
        {
            _certificadoRepository = certificadoRepository;
        }

        public async Task<CertificadoPropiedad> CrearCertificadoAsync(CertificadoPropiedad nuevoCertificado)
        {
            await _certificadoRepository.AddAsync(nuevoCertificado);
            await _certificadoRepository.SaveChangesAsync();
            return nuevoCertificado;
        }

        public async Task<CertificadoPropiedad> ObtenerCertificadoPorIdAsync(int id)
        {
            return await _certificadoRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<CertificadoPropiedad>> ObtenerTodosLosCertificadosAsync()
        {
            return await _certificadoRepository.GetAllAsync();
        }

        public async Task<bool> ActualizarCertificadoAsync(CertificadoPropiedad certificadoAActualizar)
        {
            _certificadoRepository.Update(certificadoAActualizar);
            var updated = await _certificadoRepository.SaveChangesAsync();
            return updated > 0;
        }

        public async Task<bool> EliminarCertificadoAsync(int id)
        {
            var certificado = await _certificadoRepository.GetByIdAsync(id);
            if (certificado == null) return false;

            _certificadoRepository.Delete(certificado);
            var deleted = await _certificadoRepository.SaveChangesAsync();
            return deleted > 0;
        }
    }
}