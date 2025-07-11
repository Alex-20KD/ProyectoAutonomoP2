import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString, MinLength } from 'class-validator';

@InputType()
export class CreateVisitaDomiciliariaInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  adoptanteId: number;

  // fechaVisita se autogenera en la entidad con @CreateDateColumn,
  // por lo que no es necesario incluirla aquí si se quiere que sea la fecha de creación del registro.
  // Si necesitas que el usuario la envíe, descomenta y usa IsDateString.
  /*
  @Field(() => Date)
  @IsNotEmpty()
  @IsDateString()
  fechaVisita: Date;
  */

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(5) // Una dirección verificada probablemente tenga al menos 5 caracteres
  direccionVerificada: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  observaciones?: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  resultado: string; // 'Aprobada', 'Condicional', 'Rechazada'

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  inspectorId?: number;
}