// api-gateway/src/modules/adoptante-gateway/dto/create-adoptante.input.ts
import { Field, InputType } from '@nestjs/graphql'; // <-- ¡Asegúrate que InputType esté importado!
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType() // <-- ¡Asegúrate que este decorador esté presente!
export class CreateAdoptanteInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  telefono!: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  direccion!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  tipo_documento!: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  numero_documento!: number;
}