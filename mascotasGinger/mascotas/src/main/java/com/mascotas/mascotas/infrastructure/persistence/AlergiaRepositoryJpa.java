package com.mascotas.mascotas.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AlergiaRepositoryJpa extends JpaRepository<AlergiaEntity, Long> {
    List<AlergiaEntity> findByMascota_Id(Long mascotaId);
} 