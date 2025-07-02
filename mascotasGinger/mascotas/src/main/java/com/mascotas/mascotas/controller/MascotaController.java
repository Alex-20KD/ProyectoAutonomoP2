// controller/MascotaController.java
package com.mascotas.mascotas.controller;

import com.mascotas.mascotas.application.service.MascotaService;
import com.mascotas.mascotas.domain.model.Mascota;
import com.mascotas.mascotas.dto.MascotaRequestDTO;
import com.mascotas.mascotas.dto.MascotaResponseDTO;
import com.mascotas.mascotas.mapper.MascotaMapper;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/mascotas")
public class MascotaController {
    private final MascotaService service;

    public MascotaController(MascotaService service) {
        this.service = service;
    }

    @GetMapping
    public List<MascotaResponseDTO> listar() {
        return service.listarTodas().stream()
                .map(MascotaMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @PostMapping
    public MascotaResponseDTO crear(@RequestBody MascotaRequestDTO mascotaRequestDTO) {
        Mascota mascota = MascotaMapper.toDomain(mascotaRequestDTO);
        Mascota saved = service.guardar(mascota);
        return MascotaMapper.toResponseDTO(saved);
    }

    @GetMapping("/{id}")
    public MascotaResponseDTO obtener(@PathVariable Long id) {
        Mascota mascota = service.obtenerPorId(id);
        return MascotaMapper.toResponseDTO(mascota);
    }

    @PutMapping("/{id}")
    public MascotaResponseDTO actualizar(@PathVariable Long id, @RequestBody MascotaRequestDTO mascotaRequestDTO) {
        Mascota mascota = MascotaMapper.toDomain(mascotaRequestDTO);
        Mascota actualizada = service.actualizar(id, mascota);
        if (actualizada == null) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Mascota no encontrada");
        }
        return MascotaMapper.toResponseDTO(actualizada);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        boolean eliminado = service.eliminar(id);
        if (!eliminado) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Mascota no encontrada");
        }
    }
}