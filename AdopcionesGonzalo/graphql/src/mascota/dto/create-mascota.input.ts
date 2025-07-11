import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateMascotaInput {

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  especie: string;

  @Field()
  @IsString()
  raza: string;

  @Field(() => Int)
  @IsNumber()
  edad: number;

  @Field()
  @IsString()
  genero: string;

  @Field()
  @IsString()
  descripcion: string;

  @Field()
  @IsString()
  foto_url: string;

  // Se marca como opcional en la validación ya que tiene un valor por defecto
  @Field(() => Boolean, { defaultValue: true, nullable: true }) 
  @IsBoolean()
  @IsOptional()
  estado_adopcion?: boolean;
}