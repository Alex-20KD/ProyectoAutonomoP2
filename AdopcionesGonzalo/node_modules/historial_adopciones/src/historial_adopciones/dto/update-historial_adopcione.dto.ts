import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateHistorialAdopcioneDto } from './create-historial_adopcione.dto'; // Asegúrate de que este sea el nombre correcto de tu DTO de creación

export class UpdateHistorialAdopcioneDto extends PartialType(CreateHistorialAdopcioneDto) {
  @IsNumber()
  id: number; // El ID ahora es un string (UUID)
}