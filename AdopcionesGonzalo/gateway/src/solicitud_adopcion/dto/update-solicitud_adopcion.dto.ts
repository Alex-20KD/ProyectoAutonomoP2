import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitudAdopcionDto } from './create-solicitud_adopcion.dto';

export class UpdateSolicitudAdopcionDto extends PartialType(CreateSolicitudAdopcionDto) {}
