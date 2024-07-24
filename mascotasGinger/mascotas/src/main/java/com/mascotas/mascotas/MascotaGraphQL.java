package com.mascotas.mascotas;

import com.mascotas.mascotas.domain.model.Mascota;
import com.mascotas.mascotas.application.service.MascotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.time.LocalDate;
import java.util.List;

@Controller
public class MascotaGraphQL {
    @Autowired
    private MascotaService mascotaService;

    @QueryMapping
    public List<Mascota> mascotas() {
        return mascotaService.listarTodas();
    }

    @QueryMapping
    public Mascota mascotaPorId(@Argument Long id) {
        return mascotaService.obtenerPorId(id);
    }

    @MutationMapping
    public Mascota crearMascota(
            @Argument String nombre,
            @Argument String especie,
            @Argument String raza,
            @Argument Integer edad,
            @Argument String sexo,
            @Argument String color,
            @Argument String fechaIngreso
    ) {
        Mascota mascota = new Mascota();
        mascota.setNombre(nombre);
        mascota.setEspecie(especie);
        mascota.setRaza(raza);
        mascota.setEdad(edad != null ? edad : 0);
        mascota.setSexo(sexo);
        mascota.setColor(color);
        if (fechaIngreso != null) {
            mascota.setFechaIngreso(LocalDate.parse(fechaIngreso));
        }
        return mascotaService.guardar(mascota);
    }

    @MutationMapping
    public Boolean eliminarMascota(@Argument Long id) {
        return mascotaService.eliminar(id);
    }

    @MutationMapping
    public Mascota actualizarMascota(
            @Argument Long id,
            @Argument String nombre,
            @Argument String especie,
            @Argument String raza,
            @Argument Integer edad,
            @Argument String sexo,
            @Argument String color,
            @Argument String fechaIngreso
    ) {
        Mascota mascota = new Mascota();
        mascota.setNombre(nombre);
        mascota.setEspecie(especie);
        mascota.setRaza(raza);
        mascota.setEdad(edad != null ? edad : 0);
        mascota.setSexo(sexo);
        mascota.setColor(color);
        if (fechaIngreso != null) {
            mascota.setFechaIngreso(java.time.LocalDate.parse(fechaIngreso));
        }
        return mascotaService.actualizar(id, mascota);
    }
} 