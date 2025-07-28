using ApiGateway.Services.Adopciones;
using ApiGateway.Services.Legalizacion;
using ApiGateway.Services.Donantes;
using ApiGateway.Services.Integration;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configurar servicios
builder.Services.AddControllers();

// Configurar HttpClient para los servicios
builder.Services.AddHttpClient<ILegalizacionService, LegalizacionService>();
builder.Services.AddHttpClient<IAdopcionesService, AdopcionesService>();
builder.Services.AddHttpClient<IDonantesService, DonantesService>();

// Registrar servicios
builder.Services.AddScoped<ILegalizacionService, LegalizacionService>();
builder.Services.AddScoped<IAdopcionesService, AdopcionesService>();
builder.Services.AddScoped<IDonantesService, DonantesService>();
builder.Services.AddScoped<IIntegrationService, IntegrationService>();

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Configurar Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API Gateway - Sistema de Adopciones",
        Version = "v1",
        Description = "API Gateway que integra el módulo de adopciones con el sistema de legalización",
        Contact = new OpenApiContact
        {
            Name = "Equipo de Desarrollo",
            Email = "desarrollo@adopciones.com"
        }
    });

    // Incluir comentarios XML para la documentación
    var xmlFilename = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFilename);
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
});

// Configurar logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

var app = builder.Build();

// Configurar el pipeline de HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Gateway v1");
        c.RoutePrefix = string.Empty; // Swagger UI en la raíz
    });
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

// Endpoint de health check
app.MapGet("/health", () => 
{
    return Results.Ok(new 
    { 
        Status = "Healthy", 
        Timestamp = DateTime.UtcNow,
        Service = "API Gateway",
        Version = "1.0.0"
    });
});

// Endpoint de información de servicios
app.MapGet("/services", (IConfiguration config) =>
{
    return Results.Ok(new
    {
        Services = new
        {
            LegalizacionApi = config["Services:LegalizacionApi:BaseUrl"] ?? "https://localhost:7001",
            AdopcionesApi = config["Services:AdopcionesApi:BaseUrl"] ?? "http://localhost:3000",
            DonantesApi = config["Services:DonantesApi:BaseUrl"] ?? "http://localhost:8000"
        },
        Status = "Running",
        Timestamp = DateTime.UtcNow
    });
});

app.Run();
