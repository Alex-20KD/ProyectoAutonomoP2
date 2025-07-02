package com.mascotas.mascotas.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "historial_medico")
public class HistorialMedicoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mascota_id", nullable = false)
    private MascotaEntity mascota;

    @Column(columnDefinition = "TEXT")
    private String diagnosticos;

    @Column(columnDefinition = "TEXT")
    private String tratamientos;

    @Column(name = "fecha_registro")
    private LocalDate fechaRegistro;

    private String veterinario;
} 