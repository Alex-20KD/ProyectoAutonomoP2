package com.mascotas.mascotas.dto;

import java.time.LocalDate;

public class MascotaRequestDTO {
    private String nombre;
    private String especie;
    private String raza;
    private int edad;
    private String sexo;
    private String color;
    private LocalDate fechaIngreso;

    public MascotaRequestDTO() {}

    public MascotaRequestDTO(String nombre, String especie, String raza, int edad, String sexo, String color, LocalDate fechaIngreso) {
        this.nombre = nombre;
        this.especie = especie;
        this.raza = raza;
        this.edad = edad;
        this.sexo = sexo;
        this.color = color;
        this.fechaIngreso = fechaIngreso;
    }

    // Getters y setters
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getEspecie() { return especie; }
    public void setEspecie(String especie) { this.especie = especie; }
    public String getRaza() { return raza; }
    public void setRaza(String raza) { this.raza = raza; }
    public int getEdad() { return edad; }
    public void setEdad(int edad) { this.edad = edad; }
    public String getSexo() { return sexo; }
    public void setSexo(String sexo) { this.sexo = sexo; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public LocalDate getFechaIngreso() { return fechaIngreso; }
    public void setFechaIngreso(LocalDate fechaIngreso) { this.fechaIngreso = fechaIngreso; }
} 