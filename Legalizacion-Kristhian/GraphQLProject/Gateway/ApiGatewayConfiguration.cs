using Yarp.ReverseProxy.Configuration;

namespace GraphQLProject.Gateway
{
    public class ApiGatewayConfiguration
    {
        public static RouteConfig[] GetRoutes()
        {
            return new[]
            {
                new RouteConfig()
                {
                    RouteId = "graphql-route",
                    ClusterId = "graphql-cluster",
                    Match = new RouteMatch
                    {
                        Path = "/graphql/{**catch-all}"
                    },
                    Transforms = new[]
                    {
                        new Dictionary<string, string>
                        {
                            ["PathPattern"] = "/graphql/{**catch-all}"
                        }
                    }
                },
                new RouteConfig()
                {
                    RouteId = "api-route",
                    ClusterId = "api-cluster",
                    Match = new RouteMatch
                    {
                        Path = "/api/{**catch-all}"
                    },
                    Transforms = new[]
                    {
                        new Dictionary<string, string>
                        {
                            ["PathPattern"] = "/api/{**catch-all}"
                        }
                    }
                },
                new RouteConfig()
                {
                    RouteId = "health-route",
                    ClusterId = "health-cluster",
                    Match = new RouteMatch
                    {
                        Path = "/health"
                    }
                }
            };
        }

        public static ClusterConfig[] GetClusters()
        {
            return new[]
            {
                new ClusterConfig()
                {
                    ClusterId = "graphql-cluster",
                    Destinations = new Dictionary<string, DestinationConfig>
                    {
                        ["destination1"] = new DestinationConfig()
                        {
                            Address = "http://localhost:5233"
                        }
                    }
                },
                new ClusterConfig()
                {
                    ClusterId = "api-cluster",
                    Destinations = new Dictionary<string, DestinationConfig>
                    {
                        ["destination1"] = new DestinationConfig()
                        {
                            // Ejemplo de otro servicio API
                            Address = "http://localhost:5234"
                        }
                    }
                },
                new ClusterConfig()
                {
                    ClusterId = "health-cluster",
                    Destinations = new Dictionary<string, DestinationConfig>
                    {
                        ["destination1"] = new DestinationConfig()
                        {
                            Address = "http://localhost:5233"
                        }
                    }
                }
            };
        }
    }
}
