// AdopcionAnimal.Tests/AdopcionServiceTests.cs
using Application.Interfaces.Repositories;
using Application.Services;
using Core.Entities;
using Moq;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

public class AdopcionServiceTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public AdopcionesControllerTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task ObtenerAdopcionPorIdAsync_DebeRetornarAdopcion_CuandoExiste()
    {
        // Arrange (Preparar)
        var mockRepo = new Mock<IAdopcionRepository>();
        var adopcionEsperada = new Adopcion { AdopcionId = 1, Estado = "Finalizada" };
        
        mockRepo.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(adopcionEsperada);
        
        var service = new AdopcionService(mockRepo.Object);

        // Act (Actuar)
        var resultado = await service.ObtenerAdopcionPorIdAsync(1);

        // Assert (Verificar)
        Assert.NotNull(resultado);
        Assert.Equal(1, resultado.AdopcionId);
    }
}