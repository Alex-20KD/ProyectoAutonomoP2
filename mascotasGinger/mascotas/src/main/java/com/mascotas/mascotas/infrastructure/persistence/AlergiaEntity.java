package com.mascotas.mascotas.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "alergia")
public class AlergiaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mascota_id", nullable = false)
    private MascotaEntity mascota;

    private String tipoAlergia;
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    @Column(columnDefinition = "TEXT")
    private String reacciones;
    @Column(columnDefinition = "TEXT")
    private String tratamiento;
} 