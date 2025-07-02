package com.mascotas.mascotas;

import com.mascotas.mascotas.domain.model.HistorialMedico;
import com.mascotas.mascotas.application.service.HistorialMedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.time.LocalDate;
import java.util.List;

@Controller
public class HistorialMedicoGraphQL {
    @Autowired
    private HistorialMedicoService historialMedicoService;

    @QueryMapping
    public List<HistorialMedico> historialesMedicos() {
        return historialMedicoService.listarTodos();
    }

    @QueryMapping
    public HistorialMedico historialMedicoPorId(@Argument Long id) {
        return historialMedicoService.obtenerPorId(id);
    }

    @QueryMapping
    public List<HistorialMedico> historialesMedicosPorMascota(@Argument Long mascotaId) {
        return historialMedicoService.listarPorMascota(mascotaId);
    }

    @MutationMapping
    public HistorialMedico crearHistorialMedico(
            @Argument Long mascotaId,
            @Argument String diagnosticos,
            @Argument String tratamientos,
            @Argument String fechaRegistro,
            @Argument String veterinario
    ) {
        HistorialMedico historial = new HistorialMedico();
        historial.setMascotaId(mascotaId);
        historial.setDiagnosticos(diagnosticos);
        historial.setTratamientos(tratamientos);
        if (fechaRegistro != null) {
            historial.setFechaRegistro(LocalDate.parse(fechaRegistro));
        }
        historial.setVeterinario(veterinario);
        return historialMedicoService.guardar(historial);
    }

    @MutationMapping
    public HistorialMedico actualizarHistorialMedico(
            @Argument Long id,
            @Argument Long mascotaId,
            @Argument String diagnosticos,
            @Argument String tratamientos,
            @Argument String fechaRegistro,
            @Argument String veterinario
    ) {
        HistorialMedico historial = new HistorialMedico();
        historial.setMascotaId(mascotaId);
        historial.setDiagnosticos(diagnosticos);
        historial.setTratamientos(tratamientos);
        if (fechaRegistro != null) {
            historial.setFechaRegistro(java.time.LocalDate.parse(fechaRegistro));
        }
        historial.setVeterinario(veterinario);
        return historialMedicoService.actualizar(id, historial);
    }

    @MutationMapping
    public Boolean eliminarHistorialMedico(@Argument Long id) {
        return historialMedicoService.eliminar(id);
    }
} 