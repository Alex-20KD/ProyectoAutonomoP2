package com.mascotas.mascotas.application.service;

import com.mascotas.mascotas.domain.model.HistorialMedico;
import com.mascotas.mascotas.domain.repository.HistorialMedicoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HistorialMedicoService {
    private final HistorialMedicoRepository repository;

    public HistorialMedicoService(HistorialMedicoRepository repository) {
        this.repository = repository;
    }

    public List<HistorialMedico> listarTodos() {
        return repository.findAll();
    }

    public HistorialMedico guardar(HistorialMedico historialMedico) {
        return repository.save(historialMedico);
    }

    public HistorialMedico obtenerPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public boolean eliminar(Long id) {
        HistorialMedico existente = repository.findById(id).orElse(null);
        if (existente == null) return false;
        repository.deleteById(id);
        return true;
    }

    public List<HistorialMedico> listarPorMascota(Long mascotaId) {
        return repository.findByMascotaId(mascotaId);
    }

    public HistorialMedico actualizar(Long id, HistorialMedico historialMedico) {
        HistorialMedico existente = repository.findById(id).orElse(null);
        if (existente == null) return null;
        existente.setMascotaId(historialMedico.getMascotaId());
        existente.setDiagnosticos(historialMedico.getDiagnosticos());
        existente.setTratamientos(historialMedico.getTratamientos());
        existente.setFechaRegistro(historialMedico.getFechaRegistro());
        existente.setVeterinario(historialMedico.getVeterinario());
        return repository.save(existente);
    }
} 