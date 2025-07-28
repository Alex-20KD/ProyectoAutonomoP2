// -------------------- PASO 1: AÑADE ESTO AL PRINCIPIO DEL ARCHIVO --------------------
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
// ---- USINGS AÑADIDOS ----
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Services;
using Infrastructure.Repositories;
using Infrastructure.Services;
// --- USINGS PARA IDENTIDAD Y JWT ---
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
// ---------------------------------

var builder = WebApplication.CreateBuilder(args);

// -------------------- PASO 2: AÑADE TU DBCONTEXT AQUÍ --------------------------------
builder.Services.AddDbContext<AdopcionAnimalDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// ---- LÍNEAS PARA LA INYECCIÓN DE DEPENDENCIAS ----
// Repositorios
builder.Services.AddScoped<IAdopcionRepository, AdopcionRepository>();
builder.Services.AddScoped<ICertificadoPropiedadRepository, CertificadoPropiedadRepository>();
builder.Services.AddScoped<IContratoAdopcionRepository, ContratoAdopcionRepository>();
builder.Services.AddScoped<IDocumentacionMascotaRepository, DocumentacionMascotaRepository>();
builder.Services.AddScoped<ISeguimientoAdopcionRepository, SeguimientoAdopcionRepository>();

// Servicios
builder.Services.AddHttpClient<IAIService, GeminiService>();
builder.Services.AddScoped<IAdopcionService, AdopcionService>();
builder.Services.AddScoped<ICertificadoPropiedadService, CertificadoPropiedadService>();
builder.Services.AddScoped<IContratoAdopcionService, ContratoAdopcionService>();
builder.Services.AddScoped<IDocumentacionMascotaService, DocumentacionMascotaService>();
builder.Services.AddScoped<ISeguimientoAdopcionService, SeguimientoAdopcionService>();
// ---------------------------------------------------

// --- PASO 1: AÑADIR IDENTIDAD ---
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AdopcionAnimalDbContext>()
    .AddDefaultTokenProviders();

// --- PASO 2: AÑADIR AUTENTICACIÓN CON JWT ---
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});


// Esto es necesario si vas a usar controladores tipo API.
builder.Services.AddControllers();

// Para que funcione la documentación de tus futuros endpoints
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// --- PASO 3: USAR AUTENTICACIÓN Y AUTORIZACIÓN (¡EL ORDEN IMPORTA!) ---
app.UseAuthentication();
app.UseAuthorization();
// --------------------------------------------------------------------

// Esto es necesario para que los controladores funcionen
app.MapControllers();

app.Run();