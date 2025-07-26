// Application/Interfaces/Services/IAIService.cs
namespace Application.Interfaces.Services
{
    public interface IAIService
    {
        Task<string> AnalizarBienestarAnimalAsync(string observaciones);
    }
}