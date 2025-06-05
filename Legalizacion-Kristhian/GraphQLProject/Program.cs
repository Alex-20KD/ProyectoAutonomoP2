using Microsoft.EntityFrameworkCore;
using GraphQLProject.Data;
using GraphQLProject.GraphQL.Queries;
using GraphQLProject.GraphQL.Mutations;

var builder = WebApplication.CreateBuilder(args);

// Configurar Entity Framework con SQLite
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? 
                      "Data Source=GraphQLProject.db"));

// Configurar GraphQL
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddProjections()
    .AddFiltering()
    .AddSorting();

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Crear y migrar la base de datos en desarrollo
if (app.Environment.IsDevelopment())
{
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        context.Database.EnsureCreated();
    }
}

// Configurar middleware
app.UseCors();

// Mapear el endpoint de GraphQL
app.MapGraphQL();

// Página de inicio con información sobre GraphQL
app.MapGet("/", () => Results.Redirect("/graphql"));

// Ejecutar la aplicación
app.Run();
