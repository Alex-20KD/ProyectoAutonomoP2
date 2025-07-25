package com.mascotas.mascotas.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DietaRepositoryJpa extends JpaRepository<DietaEntity, Long> {
    List<DietaEntity> findByMascota_Id(Long mascotaId);
} 