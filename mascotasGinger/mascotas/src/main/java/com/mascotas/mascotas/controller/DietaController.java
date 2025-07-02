package com.mascotas.mascotas.controller;

import com.mascotas.mascotas.application.service.DietaService;
import com.mascotas.mascotas.domain.model.Dieta;
import com.mascotas.mascotas.dto.DietaRequestDTO;
import com.mascotas.mascotas.dto.DietaResponseDTO;
import com.mascotas.mascotas.mapper.DietaMapper;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/dietas")
public class DietaController {
    private final DietaService service;

    public DietaController(DietaService service) {
        this.service = service;
    }

    @GetMapping
    public List<DietaResponseDTO> listar() {
        return service.listarTodas().stream()
                .map(DietaMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/mascota/{mascotaId}")
    public List<DietaResponseDTO> listarPorMascota(@PathVariable Long mascotaId) {
        return service.listarPorMascota(mascotaId).stream()
                .map(DietaMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public DietaResponseDTO obtener(@PathVariable Long id) {
        Dieta dieta = service.obtenerPorId(id);
        return DietaMapper.toResponseDTO(dieta);
    }

    @PostMapping
    public DietaResponseDTO crear(@RequestBody DietaRequestDTO dto) {
        Dieta dieta = DietaMapper.toDomain(dto);
        Dieta saved = service.guardar(dieta);
        return DietaMapper.toResponseDTO(saved);
    }

    @PutMapping("/{id}")
    public DietaResponseDTO actualizar(@PathVariable Long id, @RequestBody DietaRequestDTO dto) {
        Dieta dieta = DietaMapper.toDomain(dto);
        Dieta actualizado = service.actualizar(id, dieta);
        if (actualizado == null) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Dieta no encontrada");
        }
        return DietaMapper.toResponseDTO(actualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        boolean eliminado = service.eliminar(id);
        if (!eliminado) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Dieta no encontrada");
        }
    }
} 