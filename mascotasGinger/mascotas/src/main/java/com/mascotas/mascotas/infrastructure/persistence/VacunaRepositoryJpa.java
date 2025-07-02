package com.mascotas.mascotas.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VacunaRepositoryJpa extends JpaRepository<VacunaEntity, Long> {
    List<VacunaEntity> findByMascota_Id(Long mascotaId);
} 