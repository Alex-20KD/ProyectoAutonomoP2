package com.mascotas.mascotas.infrastructure.persistence;

import com.mascotas.mascotas.domain.model.Mascota;
import com.mascotas.mascotas.domain.repository.MascotaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class MascotaRepositoryImpl implements MascotaRepository {
    private final MascotaRepositoryJpa jpaRepository;

    public MascotaRepositoryImpl(MascotaRepositoryJpa jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public List<Mascota> findAll() {
        return jpaRepository.findAll().stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public Mascota save(Mascota mascota) {
        MascotaEntity entity = toEntity(mascota);
        MascotaEntity saved = jpaRepository.save(entity);
        return toDomain(saved);
    }

    @Override
    public Optional<Mascota> findById(Long id) {
        return jpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    private Mascota toDomain(MascotaEntity entity) {
        return new Mascota(
            entity.getId(),
            entity.getNombre(),
            entity.getEspecie(),
            entity.getRaza(),
            entity.getEdad(),
            entity.getSexo(),
            entity.getColor(),
            entity.getFechaIngreso()
        );
    }

    private MascotaEntity toEntity(Mascota mascota) {
        return new MascotaEntity(
            mascota.getId(),
            mascota.getNombre(),
            mascota.getEspecie(),
            mascota.getRaza(),
            mascota.getEdad(),
            mascota.getSexo(),
            mascota.getColor(),
            mascota.getFechaIngreso()
        );
    }
} 