package com.mascotas.mascotas.domain.model;

import java.util.Objects;

public class Dieta {
    private Long id;
    private Long mascotaId;
    private String tipoAlimento;
    private String cantidadDiaria;
    private String horarioComidas;
    private String restricciones;

    public Dieta() {}

    public Dieta(Long id, Long mascotaId, String tipoAlimento, String cantidadDiaria, String horarioComidas, String restricciones) {
        this.id = id;
        this.mascotaId = mascotaId;
        this.tipoAlimento = tipoAlimento;
        this.cantidadDiaria = cantidadDiaria;
        this.horarioComidas = horarioComidas;
        this.restricciones = restricciones;
    }

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getMascotaId() { return mascotaId; }
    public void setMascotaId(Long mascotaId) { this.mascotaId = mascotaId; }
    public String getTipoAlimento() { return tipoAlimento; }
    public void setTipoAlimento(String tipoAlimento) { this.tipoAlimento = tipoAlimento; }
    public String getCantidadDiaria() { return cantidadDiaria; }
    public void setCantidadDiaria(String cantidadDiaria) { this.cantidadDiaria = cantidadDiaria; }
    public String getHorarioComidas() { return horarioComidas; }
    public void setHorarioComidas(String horarioComidas) { this.horarioComidas = horarioComidas; }
    public String getRestricciones() { return restricciones; }
    public void setRestricciones(String restricciones) { this.restricciones = restricciones; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Dieta dieta = (Dieta) o;
        return Objects.equals(id, dieta.id) && Objects.equals(mascotaId, dieta.mascotaId) && Objects.equals(tipoAlimento, dieta.tipoAlimento) && Objects.equals(cantidadDiaria, dieta.cantidadDiaria) && Objects.equals(horarioComidas, dieta.horarioComidas) && Objects.equals(restricciones, dieta.restricciones);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, mascotaId, tipoAlimento, cantidadDiaria, horarioComidas, restricciones);
    }
} 