package com.mascotas.mascotas.application.service;

import com.mascotas.mascotas.domain.model.Vacuna;
import com.mascotas.mascotas.domain.repository.VacunaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VacunaService {
    private final VacunaRepository repository;

    public VacunaService(VacunaRepository repository) {
        this.repository = repository;
    }

    public List<Vacuna> listarTodas() {
        return repository.findAll();
    }

    public Vacuna guardar(Vacuna vacuna) {
        return repository.save(vacuna);
    }

    public Vacuna obtenerPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public boolean eliminar(Long id) {
        Vacuna existente = repository.findById(id).orElse(null);
        if (existente == null) return false;
        repository.deleteById(id);
        return true;
    }

    public List<Vacuna> listarPorMascota(Long mascotaId) {
        return repository.findByMascotaId(mascotaId);
    }

    public Vacuna actualizar(Long id, Vacuna vacuna) {
        Vacuna existente = repository.findById(id).orElse(null);
        if (existente == null) return null;
        existente.setMascotaId(vacuna.getMascotaId());
        existente.setTipoVacuna(vacuna.getTipoVacuna());
        existente.setFechaAplicacion(vacuna.getFechaAplicacion());
        existente.setProximaDosis(vacuna.getProximaDosis());
        existente.setObservaciones(vacuna.getObservaciones());
        return repository.save(existente);
    }
} 