import { PartialType } from '@nestjs/mapped-types'; // Importa PartialType de @nestjs/mapped-types
import { IsNumber } from 'class-validator'; // Usamos IsNumber para IDs numéricos
//import { Type } from 'class-transformer'; // Necesario para @Type
import { CreateVisitaDomiciliariaDto } from './create-visita_domiciliaria.dto'; // Importa el DTO de creación

export class UpdateVisitaDomiciliariaDto extends PartialType(CreateVisitaDomiciliariaDto) {
  @IsNumber() // Valida que el ID sea un número
  id: number;
}