package com.mascotas.mascotas.controller;

import com.mascotas.mascotas.application.service.HistorialMedicoService;
import com.mascotas.mascotas.domain.model.HistorialMedico;
import com.mascotas.mascotas.dto.HistorialMedicoRequestDTO;
import com.mascotas.mascotas.dto.HistorialMedicoResponseDTO;
import com.mascotas.mascotas.mapper.HistorialMedicoMapper;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/historiales-medicos")
public class HistorialMedicoController {
    private final HistorialMedicoService service;

    public HistorialMedicoController(HistorialMedicoService service) {
        this.service = service;
    }

    @GetMapping
    public List<HistorialMedicoResponseDTO> listar() {
        return service.listarTodos().stream()
                .map(HistorialMedicoMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/mascota/{mascotaId}")
    public List<HistorialMedicoResponseDTO> listarPorMascota(@PathVariable Long mascotaId) {
        return service.listarPorMascota(mascotaId).stream()
                .map(HistorialMedicoMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public HistorialMedicoResponseDTO obtener(@PathVariable Long id) {
        HistorialMedico historial = service.obtenerPorId(id);
        return HistorialMedicoMapper.toResponseDTO(historial);
    }

    @PostMapping
    public HistorialMedicoResponseDTO crear(@RequestBody HistorialMedicoRequestDTO dto) {
        HistorialMedico historial = HistorialMedicoMapper.toDomain(dto);
        HistorialMedico saved = service.guardar(historial);
        return HistorialMedicoMapper.toResponseDTO(saved);
    }

    @PutMapping("/{id}")
    public HistorialMedicoResponseDTO actualizar(@PathVariable Long id, @RequestBody HistorialMedicoRequestDTO dto) {
        HistorialMedico historial = HistorialMedicoMapper.toDomain(dto);
        HistorialMedico actualizado = service.actualizar(id, historial);
        if (actualizado == null) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Historial médico no encontrado");
        }
        return HistorialMedicoMapper.toResponseDTO(actualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        boolean eliminado = service.eliminar(id);
        if (!eliminado) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Historial médico no encontrado");
        }
    }
} 