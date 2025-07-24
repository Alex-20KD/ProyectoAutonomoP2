import { IsString, IsNotEmpty, MinLength, IsEmail, IsNumber } from 'class-validator';
import { Type } from 'class-transformer'; // Necesario para la transformación de tipos

export class CreateAdoptanteDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number) // Convierte a número si viene como string
  telefono: number;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  tipo_documento: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number) // Convierte a número si viene como string
  numero_documento: number;
}