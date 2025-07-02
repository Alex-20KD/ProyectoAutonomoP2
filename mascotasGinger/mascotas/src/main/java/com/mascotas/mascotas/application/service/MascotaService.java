package com.mascotas.mascotas.application.service;

import com.mascotas.mascotas.domain.model.Mascota;
import com.mascotas.mascotas.domain.repository.MascotaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MascotaService {
    private final MascotaRepository repository;

    public MascotaService(MascotaRepository repository) {
        this.repository = repository;
    }

    public List<Mascota> listarTodas() {
        return repository.findAll();
    }

    public Mascota guardar(Mascota mascota) {
        return repository.save(mascota);
    }

    public Mascota obtenerPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Mascota actualizar(Long id, Mascota mascota) {
        Mascota existente = repository.findById(id).orElse(null);
        if (existente == null) return null;
        // Actualizar todos los campos
        existente.setNombre(mascota.getNombre());
        existente.setEspecie(mascota.getEspecie());
        existente.setRaza(mascota.getRaza());
        existente.setEdad(mascota.getEdad());
        existente.setSexo(mascota.getSexo());
        existente.setColor(mascota.getColor());
        existente.setFechaIngreso(mascota.getFechaIngreso());
        return repository.save(existente);
    }

    public boolean eliminar(Long id) {
        Mascota existente = repository.findById(id).orElse(null);
        if (existente == null) return false;
        repository.deleteById(id);
        return true;
    }
} 