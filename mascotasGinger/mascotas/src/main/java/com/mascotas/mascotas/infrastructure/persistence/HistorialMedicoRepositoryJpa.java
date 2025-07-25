package com.mascotas.mascotas.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HistorialMedicoRepositoryJpa extends JpaRepository<HistorialMedicoEntity, Long> {
    List<HistorialMedicoEntity> findByMascota_Id(Long mascotaId);
} 