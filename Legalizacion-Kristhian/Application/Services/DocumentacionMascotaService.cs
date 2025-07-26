// Application/Services/DocumentacionMascotaService.cs
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Core.Entities;

namespace Application.Services
{
    public class DocumentacionMascotaService : IDocumentacionMascotaService
    {
        private readonly IDocumentacionMascotaRepository _documentoRepository;

        public DocumentacionMascotaService(IDocumentacionMascotaRepository documentoRepository)
        {
            _documentoRepository = documentoRepository;
        }

        public async Task<DocumentacionMascota> CrearDocumentoAsync(DocumentacionMascota nuevoDocumento)
        {
            await _documentoRepository.AddAsync(nuevoDocumento);
            await _documentoRepository.SaveChangesAsync();
            return nuevoDocumento;
        }

        public async Task<DocumentacionMascota> ObtenerDocumentoPorIdAsync(int id)
        {
            return await _documentoRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<DocumentacionMascota>> ObtenerTodosLosDocumentosAsync()
        {
            return await _documentoRepository.GetAllAsync();
        }

        public async Task<bool> ActualizarDocumentoAsync(DocumentacionMascota documentoAActualizar)
        {
            _documentoRepository.Update(documentoAActualizar);
            var updated = await _documentoRepository.SaveChangesAsync();
            return updated > 0;
        }

        public async Task<bool> EliminarDocumentoAsync(int id)
        {
            var documento = await _documentoRepository.GetByIdAsync(id);
            if (documento == null) return false;

            _documentoRepository.Delete(documento);
            var deleted = await _documentoRepository.SaveChangesAsync();
            return deleted > 0;
        }
    }
}