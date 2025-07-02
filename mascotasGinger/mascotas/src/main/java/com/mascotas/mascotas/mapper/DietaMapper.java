package com.mascotas.mascotas.mapper;

import com.mascotas.mascotas.domain.model.Dieta;
import com.mascotas.mascotas.dto.DietaRequestDTO;
import com.mascotas.mascotas.dto.DietaResponseDTO;

public class DietaMapper {
    public static Dieta toDomain(DietaRequestDTO dto) {
        return new Dieta(
            null,
            dto.getMascotaId(),
            dto.getTipoAlimento(),
            dto.getCantidadDiaria(),
            dto.getHorarioComidas(),
            dto.getRestricciones()
        );
    }

    public static DietaResponseDTO toResponseDTO(Dieta dieta) {
        return new DietaResponseDTO(
            dieta.getId(),
            dieta.getMascotaId(),
            dieta.getTipoAlimento(),
            dieta.getCantidadDiaria(),
            dieta.getHorarioComidas(),
            dieta.getRestricciones()
        );
    }
} 