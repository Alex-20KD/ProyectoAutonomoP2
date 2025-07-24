import { PartialType } from '@nestjs/mapped-types';
import { CreateAcuerdoAdopcionDto } from './create-acuerdo_adopcion.dto';

export class UpdateAcuerdoAdopcionDto extends PartialType(CreateAcuerdoAdopcionDto) {}
