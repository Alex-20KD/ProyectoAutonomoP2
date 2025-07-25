package com.mascotas.mascotas.mapper;

import com.mascotas.mascotas.domain.model.Vacuna;
import com.mascotas.mascotas.dto.VacunaRequestDTO;
import com.mascotas.mascotas.dto.VacunaResponseDTO;

public class VacunaMapper {
    public static Vacuna toDomain(VacunaRequestDTO dto) {
        return new Vacuna(
            null,
            dto.getMascotaId(),
            dto.getTipoVacuna(),
            dto.getFechaAplicacion(),
            dto.getProximaDosis(),
            dto.getObservaciones()
        );
    }

    public static VacunaResponseDTO toResponseDTO(Vacuna vacuna) {
        return new VacunaResponseDTO(
            vacuna.getId(),
            vacuna.getMascotaId(),
            vacuna.getTipoVacuna(),
            vacuna.getFechaAplicacion(),
            vacuna.getProximaDosis(),
            vacuna.getObservaciones()
        );
    }
} 