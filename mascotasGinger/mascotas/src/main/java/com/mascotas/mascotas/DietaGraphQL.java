package com.mascotas.mascotas;

import com.mascotas.mascotas.domain.model.Dieta;
import com.mascotas.mascotas.application.service.DietaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class DietaGraphQL {
    @Autowired
    private DietaService dietaService;

    @QueryMapping
    public List<Dieta> dietas() {
        return dietaService.listarTodas();
    }

    @QueryMapping
    public Dieta dietaPorId(@Argument Long id) {
        return dietaService.obtenerPorId(id);
    }

    @QueryMapping
    public List<Dieta> dietasPorMascota(@Argument Long mascotaId) {
        return dietaService.listarPorMascota(mascotaId);
    }

    @MutationMapping
    public Dieta crearDieta(
            @Argument Long mascotaId,
            @Argument String tipoAlimento,
            @Argument String cantidadDiaria,
            @Argument String horarioComidas,
            @Argument String restricciones
    ) {
        Dieta dieta = new Dieta();
        dieta.setMascotaId(mascotaId);
        dieta.setTipoAlimento(tipoAlimento);
        dieta.setCantidadDiaria(cantidadDiaria);
        dieta.setHorarioComidas(horarioComidas);
        dieta.setRestricciones(restricciones);
        return dietaService.guardar(dieta);
    }

    @MutationMapping
    public Boolean eliminarDieta(@Argument Long id) {
        return dietaService.eliminar(id);
    }

    @MutationMapping
    public Dieta actualizarDieta(
            @Argument Long id,
            @Argument Long mascotaId,
            @Argument String tipoAlimento,
            @Argument String cantidadDiaria,
            @Argument String horarioComidas,
            @Argument String restricciones
    ) {
        Dieta dieta = new Dieta();
        dieta.setMascotaId(mascotaId);
        dieta.setTipoAlimento(tipoAlimento);
        dieta.setCantidadDiaria(cantidadDiaria);
        dieta.setHorarioComidas(horarioComidas);
        dieta.setRestricciones(restricciones);
        return dietaService.actualizar(id, dieta);
    }
} 