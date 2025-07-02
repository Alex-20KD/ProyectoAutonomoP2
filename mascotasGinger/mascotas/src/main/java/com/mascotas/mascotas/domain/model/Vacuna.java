package com.mascotas.mascotas.domain.model;

import java.time.LocalDate;
import java.util.Objects;

public class Vacuna {
    private Long id;
    private Long mascotaId;
    private String tipoVacuna;
    private LocalDate fechaAplicacion;
    private LocalDate proximaDosis;
    private String observaciones;

    public Vacuna() {}

    public Vacuna(Long id, Long mascotaId, String tipoVacuna, LocalDate fechaAplicacion, LocalDate proximaDosis, String observaciones) {
        this.id = id;
        this.mascotaId = mascotaId;
        this.tipoVacuna = tipoVacuna;
        this.fechaAplicacion = fechaAplicacion;
        this.proximaDosis = proximaDosis;
        this.observaciones = observaciones;
    }

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vacuna vacuna = (Vacuna) o;
        return Objects.equals(id, vacuna.id) && Objects.equals(mascotaId, vacuna.mascotaId) && Objects.equals(tipoVacuna, vacuna.tipoVacuna) && Objects.equals(fechaAplicacion, vacuna.fechaAplicacion) && Objects.equals(proximaDosis, vacuna.proximaDosis) && Objects.equals(observaciones, vacuna.observaciones);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, mascotaId, tipoVacuna, fechaAplicacion, proximaDosis, observaciones);
    }
} 