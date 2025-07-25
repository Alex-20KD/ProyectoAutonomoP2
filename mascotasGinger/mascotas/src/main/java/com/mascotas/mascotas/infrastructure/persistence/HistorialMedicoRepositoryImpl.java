package com.mascotas.mascotas.infrastructure.persistence;

import com.mascotas.mascotas.domain.model.HistorialMedico;
import com.mascotas.mascotas.domain.repository.HistorialMedicoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class HistorialMedicoRepositoryImpl implements HistorialMedicoRepository {
    private final HistorialMedicoRepositoryJpa jpaRepository;
    private final MascotaRepositoryJpa mascotaRepositoryJpa;

    public HistorialMedicoRepositoryImpl(HistorialMedicoRepositoryJpa jpaRepository, MascotaRepositoryJpa mascotaRepositoryJpa) {
        this.jpaRepository = jpaRepository;
        this.mascotaRepositoryJpa = mascotaRepositoryJpa;
    }

    @Override
    public List<HistorialMedico> findAll() {
        return jpaRepository.findAll().stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public HistorialMedico save(HistorialMedico historialMedico) {
        MascotaEntity mascotaEntity = mascotaRepositoryJpa.findById(historialMedico.getMascotaId()).orElse(null);
        if (mascotaEntity == null) throw new IllegalArgumentException("Mascota no encontrada");
        HistorialMedicoEntity entity = toEntity(historialMedico, mascotaEntity);
        HistorialMedicoEntity saved = jpaRepository.save(entity);
        return toDomain(saved);
    }

    @Override
    public Optional<HistorialMedico> findById(Long id) {
        return jpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public List<HistorialMedico> findByMascotaId(Long mascotaId) {
        return jpaRepository.findByMascota_Id(mascotaId).stream().map(this::toDomain).collect(Collectors.toList());
    }

    private HistorialMedico toDomain(HistorialMedicoEntity entity) {
        return new HistorialMedico(
            entity.getId(),
            entity.getMascota().getId(),
            entity.getDiagnosticos(),
            entity.getTratamientos(),
            entity.getFechaRegistro(),
            entity.getVeterinario()
        );
    }

    private HistorialMedicoEntity toEntity(HistorialMedico historialMedico, MascotaEntity mascotaEntity) {
        return new HistorialMedicoEntity(
            historialMedico.getId(),
            mascotaEntity,
            historialMedico.getDiagnosticos(),
            historialMedico.getTratamientos(),
            historialMedico.getFechaRegistro(),
            historialMedico.getVeterinario()
        );
    }
} 