import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString, Min, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAcuerdoAdopcionDto {
  @IsUUID() // solicitudId es string (UUID) porque SolicitudAdopcion.id es UUID
  @IsNotEmpty()
  solicitudId: string;

  @IsString()
  @IsNotEmpty()
  tipoAcuerdo: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number) // Asegura que se transforma a número si viene como string
  duracionMeses?: number;

  @IsNotEmpty()
  @IsDateString() // Valida que sea una fecha en formato string (ej. "YYYY-MM-DD")
  @Type(() => Date) // Transforma a objeto Date
  fechaInicio: Date;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  fechaFinEstimada?: Date;

  @IsOptional()
  @IsString()
  condicionesEspeciales?: string;

  @IsOptional()
  @IsString()
  estadoAcuerdo?: string;
}