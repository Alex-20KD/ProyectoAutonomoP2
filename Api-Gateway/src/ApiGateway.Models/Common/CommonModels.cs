using System;

namespace ApiGateway.Models.Common
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        
        public static ApiResponse<T> SuccessResult(T data, string message = "Operación exitosa")
        {
            return new ApiResponse<T>
            {
                Success = true,
                Message = message,
                Data = data
            };
        }
        
        public static ApiResponse<T> ErrorResult(string message, T data = default(T))
        {
            return new ApiResponse<T>
            {
                Success = false,
                Message = message,
                Data = data
            };
        }
    }

    public class ServiceEndpoint
    {
        public string BaseUrl { get; set; }
        public string ServiceName { get; set; }
        public bool IsHealthy { get; set; }
        public DateTime LastHealthCheck { get; set; }
    }

    public class PaginationRequest
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string Search { get; set; } = string.Empty;
        public string SortBy { get; set; } = string.Empty;
        public bool SortDescending { get; set; } = false;
    }

    public class PaginationResponse<T>
    {
        public T Data { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int TotalItems { get; set; }
        public bool HasNext { get; set; }
        public bool HasPrevious { get; set; }
    }
}
