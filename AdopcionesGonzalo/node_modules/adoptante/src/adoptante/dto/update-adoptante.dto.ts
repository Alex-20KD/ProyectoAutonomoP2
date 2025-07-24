import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateAdoptanteDto } from './create-adoptante.dto';

export class UpdateAdoptanteDto extends PartialType(CreateAdoptanteDto) {
  @IsNumber()
  id: number;
}