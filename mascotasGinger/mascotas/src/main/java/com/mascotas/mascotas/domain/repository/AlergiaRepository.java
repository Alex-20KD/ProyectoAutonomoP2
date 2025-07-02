package com.mascotas.mascotas.domain.repository;

import com.mascotas.mascotas.domain.model.Alergia;
import java.util.List;
import java.util.Optional;

public interface AlergiaRepository {
    List<Alergia> findAll();
    Alergia save(Alergia alergia);
    Optional<Alergia> findById(Long id);
    void deleteById(Long id);
    List<Alergia> findByMascotaId(Long mascotaId);
} 