import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CreateHistorialAdoptanteInput } from './create-historial_adopcione.input';

@InputType()
export class UpdateHistorialAdoptanteInput extends PartialType(CreateHistorialAdoptanteInput) {
  @Field(() => Number)
  @IsUUID()
  id: number;
}