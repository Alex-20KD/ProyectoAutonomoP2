package com.mascotas.mascotas.infrastructure.persistence;

import com.mascotas.mascotas.domain.model.Vacuna;
import com.mascotas.mascotas.domain.repository.VacunaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class VacunaRepositoryImpl implements VacunaRepository {
    private final VacunaRepositoryJpa jpaRepository;
    private final MascotaRepositoryJpa mascotaRepositoryJpa;

    public VacunaRepositoryImpl(VacunaRepositoryJpa jpaRepository, MascotaRepositoryJpa mascotaRepositoryJpa) {
        this.jpaRepository = jpaRepository;
        this.mascotaRepositoryJpa = mascotaRepositoryJpa;
    }

    @Override
    public List<Vacuna> findAll() {
        return jpaRepository.findAll().stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public Vacuna save(Vacuna vacuna) {
        MascotaEntity mascotaEntity = mascotaRepositoryJpa.findById(vacuna.getMascotaId()).orElse(null);
        if (mascotaEntity == null) throw new IllegalArgumentException("Mascota no encontrada");
        VacunaEntity entity = toEntity(vacuna, mascotaEntity);
        VacunaEntity saved = jpaRepository.save(entity);
        return toDomain(saved);
    }

    @Override
    public Optional<Vacuna> findById(Long id) {
        return jpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public List<Vacuna> findByMascotaId(Long mascotaId) {
        return jpaRepository.findByMascota_Id(mascotaId).stream().map(this::toDomain).collect(Collectors.toList());
    }

    private Vacuna toDomain(VacunaEntity entity) {
        return new Vacuna(
            entity.getId(),
            entity.getMascota().getId(),
            entity.getTipoVacuna(),
            entity.getFechaAplicacion(),
            entity.getProximaDosis(),
            entity.getObservaciones()
        );
    }

    private VacunaEntity toEntity(Vacuna vacuna, MascotaEntity mascotaEntity) {
        return new VacunaEntity(
            vacuna.getId(),
            mascotaEntity,
            vacuna.getTipoVacuna(),
            vacuna.getFechaAplicacion(),
            vacuna.getProximaDosis(),
            vacuna.getObservaciones()
        );
    }
} 