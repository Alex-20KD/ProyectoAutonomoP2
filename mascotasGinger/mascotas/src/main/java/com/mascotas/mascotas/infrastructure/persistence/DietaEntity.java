package com.mascotas.mascotas.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "dieta")
public class DietaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mascota_id", nullable = false)
    private MascotaEntity mascota;

    private String tipoAlimento;
    private String cantidadDiaria;
    private String horarioComidas;
    @Column(columnDefinition = "TEXT")
    private String restricciones;
} 