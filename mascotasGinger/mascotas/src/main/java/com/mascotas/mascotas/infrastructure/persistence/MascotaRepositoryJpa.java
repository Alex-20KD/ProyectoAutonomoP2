package com.mascotas.mascotas.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MascotaRepositoryJpa extends JpaRepository<MascotaEntity, Long> {
} 