package com.mascotas.mascotas.domain.model;

import java.util.Objects;

public class Alergia {
    private Long id;
    private Long mascotaId;
    private String tipoAlergia;
    private String descripcion;
    private String reacciones;
    private String tratamiento;

    public Alergia() {}

    public Alergia(Long id, Long mascotaId, String tipoAlergia, String descripcion, String reacciones, String tratamiento) {
        this.id = id;
        this.mascotaId = mascotaId;
        this.tipoAlergia = tipoAlergia;
        this.descripcion = descripcion;
        this.reacciones = reacciones;
        this.tratamiento = tratamiento;
    }

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getMascotaId() { return mascotaId; }
    public void setMascotaId(Long mascotaId) { this.mascotaId = mascotaId; }
    public String getTipoAlergia() { return tipoAlergia; }
    public void setTipoAlergia(String tipoAlergia) { this.tipoAlergia = tipoAlergia; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public String getReacciones() { return reacciones; }
    public void setReacciones(String reacciones) { this.reacciones = reacciones; }
    public String getTratamiento() { return tratamiento; }
    public void setTratamiento(String tratamiento) { this.tratamiento = tratamiento; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Alergia alergia = (Alergia) o;
        return Objects.equals(id, alergia.id) && Objects.equals(mascotaId, alergia.mascotaId) && Objects.equals(tipoAlergia, alergia.tipoAlergia) && Objects.equals(descripcion, alergia.descripcion) && Objects.equals(reacciones, alergia.reacciones) && Objects.equals(tratamiento, alergia.tratamiento);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, mascotaId, tipoAlergia, descripcion, reacciones, tratamiento);
    }
} 