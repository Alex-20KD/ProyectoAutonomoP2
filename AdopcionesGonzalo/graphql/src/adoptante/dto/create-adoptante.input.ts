import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MinLength, IsEmail, IsNumber} from 'class-validator';

@InputType()
export class CreateAdoptanteInput {

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  telefono: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  direccion: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  tipo_documento: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  numero_documento: number;
}
