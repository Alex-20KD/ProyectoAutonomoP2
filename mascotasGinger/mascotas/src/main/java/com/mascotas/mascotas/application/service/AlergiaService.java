package com.mascotas.mascotas.application.service;

import com.mascotas.mascotas.domain.model.Alergia;
import com.mascotas.mascotas.domain.repository.AlergiaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AlergiaService {
    private final AlergiaRepository repository;

    public AlergiaService(AlergiaRepository repository) {
        this.repository = repository;
    }

    public List<Alergia> listarTodas() {
        return repository.findAll();
    }

    public Alergia guardar(Alergia alergia) {
        return repository.save(alergia);
    }

    public Alergia obtenerPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public boolean eliminar(Long id) {
        Alergia existente = repository.findById(id).orElse(null);
        if (existente == null) return false;
        repository.deleteById(id);
        return true;
    }

    public List<Alergia> listarPorMascota(Long mascotaId) {
        return repository.findByMascotaId(mascotaId);
    }

    public Alergia actualizar(Long id, Alergia alergia) {
        Alergia existente = repository.findById(id).orElse(null);
        if (existente == null) return null;
        existente.setMascotaId(alergia.getMascotaId());
        existente.setTipoAlergia(alergia.getTipoAlergia());
        existente.setDescripcion(alergia.getDescripcion());
        existente.setReacciones(alergia.getReacciones());
        existente.setTratamiento(alergia.getTratamiento());
        return repository.save(existente);
    }
} 