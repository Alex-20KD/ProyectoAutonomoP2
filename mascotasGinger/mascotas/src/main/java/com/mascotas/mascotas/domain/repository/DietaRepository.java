package com.mascotas.mascotas.domain.repository;

import com.mascotas.mascotas.domain.model.Dieta;
import java.util.List;
import java.util.Optional;

public interface DietaRepository {
    List<Dieta> findAll();
    Dieta save(Dieta dieta);
    Optional<Dieta> findById(Long id);
    void deleteById(Long id);
    List<Dieta> findByMascotaId(Long mascotaId);
} 