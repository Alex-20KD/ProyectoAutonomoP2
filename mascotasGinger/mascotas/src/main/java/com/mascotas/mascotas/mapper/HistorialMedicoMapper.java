package com.mascotas.mascotas.mapper;

import com.mascotas.mascotas.domain.model.HistorialMedico;
import com.mascotas.mascotas.dto.HistorialMedicoRequestDTO;
import com.mascotas.mascotas.dto.HistorialMedicoResponseDTO;

public class HistorialMedicoMapper {
    public static HistorialMedico toDomain(HistorialMedicoRequestDTO dto) {
        return new HistorialMedico(
            null,
            dto.getMascotaId(),
            dto.getDiagnosticos(),
            dto.getTratamientos(),
            dto.getFechaRegistro(),
            dto.getVeterinario()
        );
    }

    public static HistorialMedicoResponseDTO toResponseDTO(HistorialMedico historial) {
        return new HistorialMedicoResponseDTO(
            historial.getId(),
            historial.getMascotaId(),
            historial.getDiagnosticos(),
            historial.getTratamientos(),
            historial.getFechaRegistro(),
            historial.getVeterinario()
        );
    }
} 