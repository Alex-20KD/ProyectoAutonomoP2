import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateHistorialAdopcioneDto } from './create-historial_adopcione.dto'; // Asegúrate de que este sea el nombre correcto de tu DTO de creación

export class UpdateHistorialAdopcioneDto extends PartialType(CreateHistorialAdopcioneDto) {
  @IsUUID()
  id: string; // El ID ahora es un string (UUID)
}