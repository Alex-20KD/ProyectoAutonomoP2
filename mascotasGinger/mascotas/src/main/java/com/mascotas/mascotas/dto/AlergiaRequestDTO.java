package com.mascotas.mascotas.dto;

public class AlergiaRequestDTO {
    private Long mascotaId;
    private String tipoAlergia;
    private String descripcion;
    private String reacciones;
    private String tratamiento;

    public AlergiaRequestDTO() {}

    public AlergiaRequestDTO(Long mascotaId, String tipoAlergia, String descripcion, String reacciones, String tratamiento) {
        this.mascotaId = mascotaId;
        this.tipoAlergia = tipoAlergia;
        this.descripcion = descripcion;
        this.reacciones = reacciones;
        this.tratamiento = tratamiento;
    }

    // Getters y setters
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
} 