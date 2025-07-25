package com.mascotas.mascotas;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class SimpleQuery {
    @QueryMapping
    public String hello() {
        return "¡Hola desde GraphQL!";
    }
} 