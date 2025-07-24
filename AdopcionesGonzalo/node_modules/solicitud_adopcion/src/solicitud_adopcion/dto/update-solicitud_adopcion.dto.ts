import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator'; // Changed from IsUUID to IsNumber
import { CreateSolicitudAdopcionDto } from './create-solicitud_adopcion.dto';
//import { Type } from 'class-transformer'; // Needed for @Type(() => Number)

export class UpdateSolicitudAdopcionDto extends PartialType(CreateSolicitudAdopcionDto) {
  @IsNumber()
  id: number;
}