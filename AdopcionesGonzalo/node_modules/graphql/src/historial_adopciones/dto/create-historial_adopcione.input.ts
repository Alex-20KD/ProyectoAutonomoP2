import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class CreateHistorialAdoptanteInput {

  @IsNumber()
  @IsNotEmpty() 
  @Field()
  solicitud_id: number;

  @Column()
  @IsNumber()
  @Field()
  adopciones_permanentes: number;

  @Column()
  @IsNumber()
  @Field()
  adopciones_temporales: number;

  @Column()
  @IsDate()
  @Field()
  fecha_ultima_adopcion: Date;

  @Column()
  @IsNumber()
  @Field(() => Int )
  calificacion: number;

  @Column()
  @IsString()
  @Field()
  @MinLength(10)
  notas: string;
}
