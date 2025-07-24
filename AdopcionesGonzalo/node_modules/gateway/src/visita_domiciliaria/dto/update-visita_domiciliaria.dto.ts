import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitaDomiciliariaDto } from './create-visita_domiciliaria.dto';

export class UpdateVisitaDomiciliariaDto extends PartialType(CreateVisitaDomiciliariaDto) {}
