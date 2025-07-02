package com.mascotas.mascotas.mapper;

import com.mascotas.mascotas.domain.model.Alergia;
import com.mascotas.mascotas.dto.AlergiaRequestDTO;
import com.mascotas.mascotas.dto.AlergiaResponseDTO;

public class AlergiaMapper {
    public static Alergia toDomain(AlergiaRequestDTO dto) {
        return new Alergia(
            null,
            dto.getMascotaId(),
            dto.getTipoAlergia(),
            dto.getDescripcion(),
            dto.getReacciones(),
            dto.getTratamiento()
        );
    }

    public static AlergiaResponseDTO toResponseDTO(Alergia alergia) {
        return new AlergiaResponseDTO(
            alergia.getId(),
            alergia.getMascotaId(),
            alergia.getTipoAlergia(),
            alergia.getDescripcion(),
            alergia.getReacciones(),
            alergia.getTratamiento()
        );
    }
} 