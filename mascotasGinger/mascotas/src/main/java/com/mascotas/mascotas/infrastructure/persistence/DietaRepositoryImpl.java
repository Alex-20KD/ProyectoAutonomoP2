package com.mascotas.mascotas.infrastructure.persistence;

import com.mascotas.mascotas.domain.model.Dieta;
import com.mascotas.mascotas.domain.repository.DietaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class DietaRepositoryImpl implements DietaRepository {
    private final DietaRepositoryJpa jpaRepository;
    private final MascotaRepositoryJpa mascotaRepositoryJpa;

    public DietaRepositoryImpl(DietaRepositoryJpa jpaRepository, MascotaRepositoryJpa mascotaRepositoryJpa) {
        this.jpaRepository = jpaRepository;
        this.mascotaRepositoryJpa = mascotaRepositoryJpa;
    }

    @Override
    public List<Dieta> findAll() {
        return jpaRepository.findAll().stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public Dieta save(Dieta dieta) {
        MascotaEntity mascotaEntity = mascotaRepositoryJpa.findById(dieta.getMascotaId()).orElse(null);
        if (mascotaEntity == null) throw new IllegalArgumentException("Mascota no encontrada");
        DietaEntity entity = toEntity(dieta, mascotaEntity);
        DietaEntity saved = jpaRepository.save(entity);
        return toDomain(saved);
    }

    @Override
    public Optional<Dieta> findById(Long id) {
        return jpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public List<Dieta> findByMascotaId(Long mascotaId) {
        return jpaRepository.findByMascota_Id(mascotaId).stream().map(this::toDomain).collect(Collectors.toList());
    }

    private Dieta toDomain(DietaEntity entity) {
        return new Dieta(
            entity.getId(),
            entity.getMascota().getId(),
            entity.getTipoAlimento(),
            entity.getCantidadDiaria(),
            entity.getHorarioComidas(),
            entity.getRestricciones()
        );
    }

    private DietaEntity toEntity(Dieta dieta, MascotaEntity mascotaEntity) {
        return new DietaEntity(
            dieta.getId(),
            mascotaEntity,
            dieta.getTipoAlimento(),
            dieta.getCantidadDiaria(),
            dieta.getHorarioComidas(),
            dieta.getRestricciones()
        );
    }
} 