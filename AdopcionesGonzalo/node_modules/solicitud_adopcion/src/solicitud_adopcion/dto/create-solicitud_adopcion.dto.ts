import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSolicitudAdopcionDto {
  @IsUUID() // Adoptante.id es UUID (string)
  @IsNotEmpty()
  adoptanteId: string;

  @IsNumber() // Mascota.id es number
  @IsNotEmpty()
  @Type(() => Number)
  mascotaId: number;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsString()
  @IsNotEmpty()
  tipoAdopcion: string;

  @IsOptional()
  @IsString()
  comentariosAdoptante?: string;

  @IsOptional()
  @IsDateString() // Valida que sea una fecha en formato string (ej. "YYYY-MM-DD")
  @Type(() => Date) // Transforma a objeto Date
  fechaAprobacionRechazo?: Date;

  @IsOptional()
  @IsString()
  motivoRechazo?: string;
}