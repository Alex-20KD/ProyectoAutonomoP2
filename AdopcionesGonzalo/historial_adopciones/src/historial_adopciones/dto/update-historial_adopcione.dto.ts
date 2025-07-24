import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialAdopcioneDto } from './create-historial_adopcione.dto';

export class UpdateHistorialAdopcioneDto extends PartialType(CreateHistorialAdopcioneDto) {}
