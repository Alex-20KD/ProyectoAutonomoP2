import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString, IsUUID } from 'class-validator';

@InputType()
export class CreateSolicitudAdopcionInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsNumber() // Si Adoptante.id es UUID, valida que el string sea un UUID válido. Si Adoptante.id es number, usa @IsNumber() en su lugar.
  adoptanteId: number; // Tipo de dato si Adoptante.id es string (UUID)
  // adoptanteId: number; // Tipo de dato si Adoptante.id es number (autoincremental)

  @Field(() => ID)
  @IsNotEmpty()
  @IsNumber() // Si Mascota.id es UUID, valida que el string sea un UUID válido. Si Mascota.id es number, usa @IsNumber() en su lugar.
  mascotaId: number; // Tipo de dato si Mascota.id es string (UUID)
  // mascotaId: number; // Tipo de dato si Mascota.id es number (autoincremental)

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  estado: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  tipoAdopcion: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  comentariosAdoptante?: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDateString()
  fechaAprobacionRechazo?: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  motivoRechazo?: string;
}