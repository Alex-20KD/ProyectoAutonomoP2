package com.mascotas.mascotas.application.service;

import com.mascotas.mascotas.domain.model.Dieta;
import com.mascotas.mascotas.domain.repository.DietaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DietaService {
    private final DietaRepository repository;

    public DietaService(DietaRepository repository) {
        this.repository = repository;
    }

    public List<Dieta> listarTodas() {
        return repository.findAll();
    }

    public Dieta guardar(Dieta dieta) {
        return repository.save(dieta);
    }

    public Dieta obtenerPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public boolean eliminar(Long id) {
        Dieta existente = repository.findById(id).orElse(null);
        if (existente == null) return false;
        repository.deleteById(id);
        return true;
    }

    public List<Dieta> listarPorMascota(Long mascotaId) {
        return repository.findByMascotaId(mascotaId);
    }

    public Dieta actualizar(Long id, Dieta dieta) {
        Dieta existente = repository.findById(id).orElse(null);
        if (existente == null) return null;
        existente.setMascotaId(dieta.getMascotaId());
        existente.setTipoAlimento(dieta.getTipoAlimento());
        existente.setCantidadDiaria(dieta.getCantidadDiaria());
        existente.setHorarioComidas(dieta.getHorarioComidas());
        existente.setRestricciones(dieta.getRestricciones());
        return repository.save(existente);
    }
} 