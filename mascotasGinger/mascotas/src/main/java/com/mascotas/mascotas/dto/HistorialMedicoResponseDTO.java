package com.mascotas.mascotas.dto;

import java.time.LocalDate;

public class HistorialMedicoResponseDTO {
    private Long id;
    private Long mascotaId;
    private String diagnosticos;
    private String tratamientos;
    private LocalDate fechaRegistro;
    private String veterinario;

    public HistorialMedicoResponseDTO() {}

    public HistorialMedicoResponseDTO(Long id, Long mascotaId, String diagnosticos, String tratamientos, LocalDate fechaRegistro, String veterinario) {
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
} 