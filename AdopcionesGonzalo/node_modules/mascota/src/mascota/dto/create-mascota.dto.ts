import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer'; // Necesario para la transformación de tipo si recibes strings para números/booleanos

export class CreateMascotaDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty() // Añadí IsNotEmpty aquí, usualmente todos los campos requeridos en el POST lo tienen
  especie: string;

  @IsString()
  @IsNotEmpty()
  raza: string;

  @IsNumber()
  @IsNotEmpty() // Asumiendo que la edad es obligatoria en la creación
  @Type(() => Number) // Convierte el valor a número si viene como string (útil para peticiones HTTP)
  edad: number;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  foto_url: string;

  @IsBoolean()
  @IsOptional() // Sigue siendo opcional porque tiene un valor por defecto en la entidad o en la lógica de negocio
  @Type(() => Boolean) // Convierte el valor a booleano si viene como string
  estado_adopcion?: boolean;

  // Opcional: Si quieres permitir asociar una mascota a un adoptante al crearla.
  // @IsOptional()
  // @IsNumber()
  // @Type(() => Number)
  // adoptanteId?: number; 
}
