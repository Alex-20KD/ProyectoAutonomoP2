package com.mascotas.mascotas.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "mascota")
public class MascotaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String especie;
    private String raza;
    private int edad;
    private String sexo;
    private String color;
    @Column(name = "fecha_ingreso")
    private LocalDate fechaIngreso;
} 