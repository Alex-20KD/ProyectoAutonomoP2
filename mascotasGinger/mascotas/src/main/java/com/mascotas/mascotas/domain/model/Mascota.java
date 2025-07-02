package com.mascotas.mascotas.domain.model;

import java.time.LocalDate;
import java.util.Objects;

public class Mascota {
    private Long id;
    private String nombre;
    private String especie;
    private String raza;
    private int edad;
    private String sexo;
    private String color;
    private LocalDate fechaIngreso;

    public Mascota() {}

    public Mascota(Long id, String nombre, String especie, String raza, int edad, String sexo, String color, LocalDate fechaIngreso) {
        this.id = id;
        this.nombre = nombre;
        this.especie = especie;
        this.raza = raza;
        this.edad = edad;
        this.sexo = sexo;
        this.color = color;
        this.fechaIngreso = fechaIngreso;
    }

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Mascota mascota = (Mascota) o;
        return edad == mascota.edad && Objects.equals(id, mascota.id) && Objects.equals(nombre, mascota.nombre) && Objects.equals(especie, mascota.especie) && Objects.equals(raza, mascota.raza) && Objects.equals(sexo, mascota.sexo) && Objects.equals(color, mascota.color) && Objects.equals(fechaIngreso, mascota.fechaIngreso);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nombre, especie, raza, edad, sexo, color, fechaIngreso);
    }
} 