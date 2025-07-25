import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateHistorialAdoptanteInput } from './create-historial_adopcione.input';

export class UpdateHistorialAdopcioneDto extends PartialType(CreateHistorialAdoptanteInput) {
  @IsUUID()
  id: number;
}