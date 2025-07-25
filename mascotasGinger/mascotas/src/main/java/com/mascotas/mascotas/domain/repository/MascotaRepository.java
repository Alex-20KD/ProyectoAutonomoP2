package com.mascotas.mascotas.domain.repository;

import com.mascotas.mascotas.domain.model.Mascota;
import java.util.List;
import java.util.Optional;

public interface MascotaRepository {
    List<Mascota> findAll();
    Mascota save(Mascota mascota);
    Optional<Mascota> findById(Long id);
    void deleteById(Long id);
} 