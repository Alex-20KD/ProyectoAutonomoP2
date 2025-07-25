package com.mascotas.mascotas.domain.model;

import java.time.LocalDate;
import java.util.Objects;

public class HistorialMedico {
    private Long id;
    private Long mascotaId;
    private String diagnosticos;
    private String tratamientos;
    private LocalDate fechaRegistro;
    private String veterinario;

    public HistorialMedico() {}

    public HistorialMedico(Long id, Long mascotaId, String diagnosticos, String tratamientos, LocalDate fechaRegistro, String veterinario) {
        this.id = id;
        this.mascotaId = mascotaId;
        this.diagnosticos = diagnosticos;
        this.tratamientos = tratamientos;
        this.fechaRegistro = fechaRegistro;
        this.veterinario = veterinario;
    }

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getMascotaId() { return mascotaId; }
    public void setMascotaId(Long mascotaId) { this.mascotaId = mascotaId; }
    public String getDiagnosticos() { return diagnosticos; }
    public void setDiagnosticos(String diagnosticos) { this.diagnosticos = diagnosticos; }
    public String getTratamientos() { return tratamientos; }
    public void setTratamientos(String tratamientos) { this.tratamientos = tratamientos; }
    public LocalDate getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDate fechaRegistro) { this.fechaRegistro = fechaRegistro; }
    public String getVeterinario() { return veterinario; }
    public void setVeterinario(String veterinario) { this.veterinario = veterinario; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HistorialMedico that = (HistorialMedico) o;
        return Objects.equals(id, that.id) && Objects.equals(mascotaId, that.mascotaId) && Objects.equals(diagnosticos, that.diagnosticos) && Objects.equals(tratamientos, that.tratamientos) && Objects.equals(fechaRegistro, that.fechaRegistro) && Objects.equals(veterinario, that.veterinario);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, mascotaId, diagnosticos, tratamientos, fechaRegistro, veterinario);
    }
} 