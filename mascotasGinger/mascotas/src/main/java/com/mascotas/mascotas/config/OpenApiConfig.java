package com.mascotas.mascotas.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("API de Gestión de Mascotas")
                .version("1.0.0")
                .description("API profesional para la gestión integral de mascotas, historial médico, vacunas, dietas y alergias. Permite CRUD completo y consultas avanzadas.")
                .license(new License()
                    .name("MIT License")
                    .url("https://opensource.org/licenses/MIT")
                )
            );
    }
} 