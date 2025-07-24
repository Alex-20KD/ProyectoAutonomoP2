import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString, MinLength, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVisitaDomiciliariaDto {
  @IsUUID() // Adoptante.id es string (UUID)
  @IsNotEmpty()
  adoptanteId: string;

  @IsOptional() // Hacemos la fecha opcional si se autogenera en la entidad
  @IsDateString() // Valida que sea una fecha en formato string (ej. "YYYY-MM-DD")
  @Type(() => Date) // Transforma a objeto Date
  fechaVisita?: Date; // Si se permite al usuario enviar la fecha de visita

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  direccionVerificada: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsString()
  @IsNotEmpty()
  resultado: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number) // Asegura que se transforma a número si viene como string
  inspectorId?: number;
}