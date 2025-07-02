package com.mascotas.mascotas;

import com.mascotas.mascotas.domain.model.Vacuna;
import com.mascotas.mascotas.application.service.VacunaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.time.LocalDate;
import java.util.List;

@Controller
public class VacunaGraphQL {
    @Autowired
    private VacunaService vacunaService;

    @QueryMapping
    public List<Vacuna> vacunas() {
        return vacunaService.listarTodas();
    }

    @QueryMapping
    public Vacuna vacunaPorId(@Argument Long id) {
        return vacunaService.obtenerPorId(id);
    }

    @QueryMapping
    public List<Vacuna> vacunasPorMascota(@Argument Long mascotaId) {
        return vacunaService.listarPorMascota(mascotaId);
    }

    @MutationMapping
    public Vacuna crearVacuna(
            @Argument Long mascotaId,
            @Argument String tipoVacuna,
            @Argument String fechaAplicacion,
            @Argument String proximaDosis,
            @Argument String observaciones
    ) {
        Vacuna vacuna = new Vacuna();
        vacuna.setMascotaId(mascotaId);
        vacuna.setTipoVacuna(tipoVacuna);
        if (fechaAplicacion != null) {
            vacuna.setFechaAplicacion(LocalDate.parse(fechaAplicacion));
        }
        if (proximaDosis != null) {
            vacuna.setProximaDosis(LocalDate.parse(proximaDosis));
        }
        vacuna.setObservaciones(observaciones);
        return vacunaService.guardar(vacuna);
    }

    @MutationMapping
    public Boolean eliminarVacuna(@Argument Long id) {
        return vacunaService.eliminar(id);
    }

    @MutationMapping
    public Vacuna actualizarVacuna(
            @Argument Long id,
            @Argument Long mascotaId,
            @Argument String tipoVacuna,
            @Argument String fechaAplicacion,
            @Argument String proximaDosis,
            @Argument String observaciones
    ) {
        Vacuna vacuna = new Vacuna();
        vacuna.setMascotaId(mascotaId);
        vacuna.setTipoVacuna(tipoVacuna);
        if (fechaAplicacion != null) {
            vacuna.setFechaAplicacion(java.time.LocalDate.parse(fechaAplicacion));
        }
        if (proximaDosis != null) {
            vacuna.setProximaDosis(java.time.LocalDate.parse(proximaDosis));
        }
        vacuna.setObservaciones(observaciones);
        return vacunaService.actualizar(id, vacuna);
    }
} 