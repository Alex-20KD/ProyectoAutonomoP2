import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator'; // Usamos IsUUID para IDs string (UUID)
import { CreateAcuerdoAdopcionDto } from './create-acuerdo_adopcion.dto';

export class UpdateAcuerdoAdopcionDto extends PartialType(CreateAcuerdoAdopcionDto) {
  @IsNumber() // Valida que el ID sea un UUID string
  id: number; 
}