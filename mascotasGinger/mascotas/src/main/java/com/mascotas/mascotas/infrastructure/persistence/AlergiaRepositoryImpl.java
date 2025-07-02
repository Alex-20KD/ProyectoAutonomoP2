package com.mascotas.mascotas.infrastructure.persistence;

import com.mascotas.mascotas.domain.model.Alergia;
import com.mascotas.mascotas.domain.repository.AlergiaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class AlergiaRepositoryImpl implements AlergiaRepository {
    private final AlergiaRepositoryJpa jpaRepository;
    private final MascotaRepositoryJpa mascotaRepositoryJpa;

    public AlergiaRepositoryImpl(AlergiaRepositoryJpa jpaRepository, MascotaRepositoryJpa mascotaRepositoryJpa) {
        this.jpaRepository = jpaRepository;
        this.mascotaRepositoryJpa = mascotaRepositoryJpa;
    }

    @Override
    public List<Alergia> findAll() {
        return jpaRepository.findAll().stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public Alergia save(Alergia alergia) {
        MascotaEntity mascotaEntity = mascotaRepositoryJpa.findById(alergia.getMascotaId()).orElse(null);
        if (mascotaEntity == null) throw new IllegalArgumentException("Mascota no encontrada");
        AlergiaEntity entity = toEntity(alergia, mascotaEntity);
        AlergiaEntity saved = jpaRepository.save(entity);
        return toDomain(saved);
    }

    @Override
    public Optional<Alergia> findById(Long id) {
        return jpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public List<Alergia> findByMascotaId(Long mascotaId) {
        return jpaRepository.findByMascota_Id(mascotaId).stream().map(this::toDomain).collect(Collectors.toList());
    }

    private Alergia toDomain(AlergiaEntity entity) {
        return new Alergia(
            entity.getId(),
            entity.getMascota().getId(),
            entity.getTipoAlergia(),
            entity.getDescripcion(),
            entity.getReacciones(),
            entity.getTratamiento()
        );
    }

    private AlergiaEntity toEntity(Alergia alergia, MascotaEntity mascotaEntity) {
        return new AlergiaEntity(
            alergia.getId(),
            mascotaEntity,
            alergia.getTipoAlergia(),
            alergia.getDescripcion(),
            alergia.getReacciones(),
            alergia.getTratamiento()
        );
    }
} 