package com.mascotas.mascotas.controller;

import com.mascotas.mascotas.application.service.VacunaService;
import com.mascotas.mascotas.domain.model.Vacuna;
import com.mascotas.mascotas.dto.VacunaRequestDTO;
import com.mascotas.mascotas.dto.VacunaResponseDTO;
import com.mascotas.mascotas.mapper.VacunaMapper;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/vacunas")
public class VacunaController {
    private final VacunaService service;

    public VacunaController(VacunaService service) {
        this.service = service;
    }

    @GetMapping
    public List<VacunaResponseDTO> listar() {
        return service.listarTodas().stream()
                .map(VacunaMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/mascota/{mascotaId}")
    public List<VacunaResponseDTO> listarPorMascota(@PathVariable Long mascotaId) {
        return service.listarPorMascota(mascotaId).stream()
                .map(VacunaMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public VacunaResponseDTO obtener(@PathVariable Long id) {
        Vacuna vacuna = service.obtenerPorId(id);
        return VacunaMapper.toResponseDTO(vacuna);
    }

    @PostMapping
    public VacunaResponseDTO crear(@RequestBody VacunaRequestDTO dto) {
        Vacuna vacuna = VacunaMapper.toDomain(dto);
        Vacuna saved = service.guardar(vacuna);
        return VacunaMapper.toResponseDTO(saved);
    }

    @PutMapping("/{id}")
    public VacunaResponseDTO actualizar(@PathVariable Long id, @RequestBody VacunaRequestDTO dto) {
        Vacuna vacuna = VacunaMapper.toDomain(dto);
        Vacuna actualizado = service.actualizar(id, vacuna);
        if (actualizado == null) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Vacuna no encontrada");
        }
        return VacunaMapper.toResponseDTO(actualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        boolean eliminado = service.eliminar(id);
        if (!eliminado) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Vacuna no encontrada");
        }
    }
} 