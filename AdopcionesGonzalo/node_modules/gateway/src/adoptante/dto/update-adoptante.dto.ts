import { PartialType } from '@nestjs/mapped-types';
import { CreateAdoptanteDto } from './create-adoptante.dto';

export class UpdateAdoptanteDto extends PartialType(CreateAdoptanteDto) {}
