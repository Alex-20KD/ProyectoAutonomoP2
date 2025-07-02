package com.mascotas.mascotas.domain.repository;

import com.mascotas.mascotas.domain.model.HistorialMedico;
import java.util.List;
import java.util.Optional;

public interface HistorialMedicoRepository {
    List<HistorialMedico> findAll();
    HistorialMedico save(HistorialMedico historialMedico);
    Optional<HistorialMedico> findById(Long id);
    void deleteById(Long id);
    List<HistorialMedico> findByMascotaId(Long mascotaId);
} 