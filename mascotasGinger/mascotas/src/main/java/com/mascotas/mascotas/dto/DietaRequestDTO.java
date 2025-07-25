package com.mascotas.mascotas.dto;

public class DietaRequestDTO {
    private Long mascotaId;
    private String tipoAlimento;
    private String cantidadDiaria;
    private String horarioComidas;
    private String restricciones;

    public DietaRequestDTO() {}

    public DietaRequestDTO(Long mascotaId, String tipoAlimento, String cantidadDiaria, String horarioComidas, String restricciones) {
        this.mascotaId = mascotaId;
        this.tipoAlimento = tipoAlimento;
        this.cantidadDiaria = cantidadDiaria;
        this.horarioComidas = horarioComidas;
        this.restricciones = restricciones;
    }

    // Getters y setters
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
} 