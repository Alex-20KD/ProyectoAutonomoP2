import { IsDate, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer'; // Necesario para la transformación de tipos

export class CreateHistorialAdopcioneDto {

  @IsNumber()
  @IsNotEmpty() 
  @Type(() => Number)
  solicitud_id: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  adopciones_permanentes: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  adopciones_temporales: number;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date) // Convierte a Date si viene como string
  fecha_ultima_adopcion: Date;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  calificacion: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  notas: string;

  // Si necesitas relacionar este historial con un adoptante existente al crearlo,
  // y Adoptante es parte de otro microservicio, podrías enviar el ID del adoptante:
  // @IsString() // O IsNumber, dependiendo del tipo de ID de Adoptante
  // @IsNotEmpty()
  // adoptanteId: string; // O number
}