package com.mascotas.mascotas.controller;

import com.mascotas.mascotas.application.service.AlergiaService;
import com.mascotas.mascotas.domain.model.Alergia;
import com.mascotas.mascotas.dto.AlergiaRequestDTO;
import com.mascotas.mascotas.dto.AlergiaResponseDTO;
import com.mascotas.mascotas.mapper.AlergiaMapper;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/alergias")
public class AlergiaController {
    private final AlergiaService service;

    public AlergiaController(AlergiaService service) {
        this.service = service;
    }

    @GetMapping
    public List<AlergiaResponseDTO> listar() {
        return service.listarTodas().stream()
                .map(AlergiaMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/mascota/{mascotaId}")
    public List<AlergiaResponseDTO> listarPorMascota(@PathVariable Long mascotaId) {
        return service.listarPorMascota(mascotaId).stream()
                .map(AlergiaMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public AlergiaResponseDTO obtener(@PathVariable Long id) {
        Alergia alergia = service.obtenerPorId(id);
        return AlergiaMapper.toResponseDTO(alergia);
    }

    @PostMapping
    public AlergiaResponseDTO crear(@RequestBody AlergiaRequestDTO dto) {
        Alergia alergia = AlergiaMapper.toDomain(dto);
        Alergia saved = service.guardar(alergia);
        return AlergiaMapper.toResponseDTO(saved);
    }

    @PutMapping("/{id}")
    public AlergiaResponseDTO actualizar(@PathVariable Long id, @RequestBody AlergiaRequestDTO dto) {
        Alergia alergia = AlergiaMapper.toDomain(dto);
        Alergia actualizado = service.actualizar(id, alergia);
        if (actualizado == null) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Alergia no encontrada");
        }
        return AlergiaMapper.toResponseDTO(actualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        boolean eliminado = service.eliminar(id);
        if (!eliminado) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Alergia no encontrada");
        }
    }
} 