// Application/Interfaces/Services/IDocumentacionMascotaService.cs
using Core.Entities;

namespace Application.Interfaces.Services
{
    public interface IDocumentacionMascotaService
    {
        Task<DocumentacionMascota> CrearDocumentoAsync(DocumentacionMascota nuevoDocumento);
        Task<DocumentacionMascota> ObtenerDocumentoPorIdAsync(int id);
        Task<IEnumerable<DocumentacionMascota>> ObtenerTodosLosDocumentosAsync();
        Task<bool> ActualizarDocumentoAsync(DocumentacionMascota documentoAActualizar);
        Task<bool> EliminarDocumentoAsync(int id);
    }
}