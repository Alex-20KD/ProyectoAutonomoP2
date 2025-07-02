package com.mascotas.mascotas.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "vacuna")
public class VacunaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mascota_id", nullable = false)
    private MascotaEntity mascota;

    private String tipoVacuna;
    private LocalDate fechaAplicacion;
    private LocalDate proximaDosis;
    @Column(columnDefinition = "TEXT")
    private String observaciones;
} 