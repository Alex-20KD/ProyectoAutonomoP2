namespace GraphQLProject.Gateway.Middleware
{
    public class ApiGatewayMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ApiGatewayMiddleware> _logger;

        public ApiGatewayMiddleware(RequestDelegate next, ILogger<ApiGatewayMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Log de la petición entrante
            _logger.LogInformation("Gateway recibió petición: {Method} {Path} desde {RemoteIp}", 
                context.Request.Method, 
                context.Request.Path, 
                context.Connection.RemoteIpAddress);

            // Agregar headers de identificación del gateway
            context.Response.Headers.Add("X-Gateway", "GraphQL-API-Gateway");
            context.Response.Headers.Add("X-Gateway-Version", "1.0.0");

            // Agregar timestamp
            context.Response.Headers.Add("X-Request-Timestamp", DateTimeOffset.UtcNow.ToString("O"));

            // Continuar con el siguiente middleware
            await _next(context);

            // Log de la respuesta
            _logger.LogInformation("Gateway respondió: {StatusCode} para {Method} {Path}", 
                context.Response.StatusCode, 
                context.Request.Method, 
                context.Request.Path);
        }
    }
}
