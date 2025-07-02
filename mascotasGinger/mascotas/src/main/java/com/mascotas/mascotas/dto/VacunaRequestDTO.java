package com.mascotas.mascotas.dto;

import java.time.LocalDate;

public class VacunaRequestDTO {
    private Long mascotaId;
    private String tipoVacuna;
    private LocalDate fechaAplicacion;
    private LocalDate proximaDosis;
    private String observaciones;

    public VacunaRequestDTO() {}

    public VacunaRequestDTO(Long mascotaId, String tipoVacuna, LocalDate fechaAplicacion, LocalDate proximaDosis, String observaciones) {
        this.mascotaId = mascotaId;
        this.tipoVacuna = tipoVacuna;
        this.fechaAplicacion = fechaAplicacion;
        this.proximaDosis = proximaDosis;
        this.observaciones = observaciones;
    }

    // Getters y setters
    public Long getMascotaId() { return mascotaId; }
    public void setMascotaId(Long mascotaId) { this.mascotaId = mascotaId; }
    public String getTipoVacuna() { return tipoVacuna; }
    public void setTipoVacuna(String tipoVacuna) { this.tipoVacuna = tipoVacuna; }
    public LocalDate getFechaAplicacion() { return fechaAplicacion; }
    public void setFechaAplicacion(LocalDate fechaAplicacion) { this.fechaAplicacion = fechaAplicacion; }
    public LocalDate getProximaDosis() { return proximaDosis; }
    public void setProximaDosis(LocalDate proximaDosis) { this.proximaDosis = proximaDosis; }
    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
} 