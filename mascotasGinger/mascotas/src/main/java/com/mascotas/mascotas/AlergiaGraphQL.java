package com.mascotas.mascotas;

import com.mascotas.mascotas.domain.model.Alergia;
import com.mascotas.mascotas.application.service.AlergiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class AlergiaGraphQL {
    @Autowired
    private AlergiaService alergiaService;

    @QueryMapping
    public List<Alergia> alergias() {
        return alergiaService.listarTodas();
    }

    @QueryMapping
    public Alergia alergiaPorId(@Argument Long id) {
        return alergiaService.obtenerPorId(id);
    }

    @QueryMapping
    public List<Alergia> alergiasPorMascota(@Argument Long mascotaId) {
        return alergiaService.listarPorMascota(mascotaId);
    }

    @MutationMapping
    public Alergia crearAlergia(
            @Argument Long mascotaId,
            @Argument String tipoAlergia,
            @Argument String descripcion,
            @Argument String reacciones,
            @Argument String tratamiento
    ) {
        Alergia alergia = new Alergia();
        alergia.setMascotaId(mascotaId);
        alergia.setTipoAlergia(tipoAlergia);
        alergia.setDescripcion(descripcion);
        alergia.setReacciones(reacciones);
        alergia.setTratamiento(tratamiento);
        return alergiaService.guardar(alergia);
    }

    @MutationMapping
    public Boolean eliminarAlergia(@Argument Long id) {
        return alergiaService.eliminar(id);
    }

    @MutationMapping
    public Alergia actualizarAlergia(
            @Argument Long id,
            @Argument Long mascotaId,
            @Argument String tipoAlergia,
            @Argument String descripcion,
            @Argument String reacciones,
            @Argument String tratamiento
    ) {
        Alergia alergia = new Alergia();
        alergia.setMascotaId(mascotaId);
        alergia.setTipoAlergia(tipoAlergia);
        alergia.setDescripcion(descripcion);
        alergia.setReacciones(reacciones);
        alergia.setTratamiento(tratamiento);
        return alergiaService.actualizar(id, alergia);
    }
} 