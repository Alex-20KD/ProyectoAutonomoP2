package com.mascotas.mascotas.mapper;

import com.mascotas.mascotas.domain.model.Mascota;
import com.mascotas.mascotas.dto.MascotaRequestDTO;
import com.mascotas.mascotas.dto.MascotaResponseDTO;

public class MascotaMapper {
    public static Mascota toDomain(MascotaRequestDTO dto) {
        return new Mascota(
            null,
            dto.getNombre(),
            dto.getEspecie(),
            dto.getRaza(),
            dto.getEdad(),
            dto.getSexo(),
            dto.getColor(),
            dto.getFechaIngreso()
        );
    }

    public static MascotaResponseDTO toResponseDTO(Mascota mascota) {
        return new MascotaResponseDTO(
            mascota.getId(),
            mascota.getNombre(),
            mascota.getEspecie(),
            mascota.getRaza(),
            mascota.getEdad(),
            mascota.getSexo(),
            mascota.getColor(),
            mascota.getFechaIngreso()
        );
    }
} 