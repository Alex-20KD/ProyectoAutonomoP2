import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString, Min } from 'class-validator';

@InputType()
export class CreateAcuerdoAdopcionInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  solicitudId: number;

  // fechaAcuerdo se autogenera en la entidad con @CreateDateColumn,
  // por lo que no es necesario incluirla aquí.

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  tipoAcuerdo: string; // 'Temporal', 'Permanente'

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1) // La duración debe ser al menos 1 mes si es temporal
  duracionMeses?: number;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDateString() // Valida que sea una cadena de fecha válida
  fechaInicio: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDateString()
  fechaFinEstimada?: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  condicionesEspeciales?: string;

  // estadoAcuerdo puede ser opcional al crear, con un valor por defecto en la entidad
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  estadoAcuerdo?: string; // 'Activo', 'Finalizado', 'Incumplido'
}