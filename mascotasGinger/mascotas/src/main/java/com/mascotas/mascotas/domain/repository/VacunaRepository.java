package com.mascotas.mascotas.domain.repository;

import com.mascotas.mascotas.domain.model.Vacuna;
import java.util.List;
import java.util.Optional;

public interface VacunaRepository {
    List<Vacuna> findAll();
    Vacuna save(Vacuna vacuna);
    Optional<Vacuna> findById(Long id);
    void deleteById(Long id);
    List<Vacuna> findByMascotaId(Long mascotaId);
} 