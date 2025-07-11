import { CreateAdoptanteInput } from './create-adoptante.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@InputType()
export class UpdateAdoptanteInput extends PartialType(CreateAdoptanteInput) {

  @Field(() => ID)
  @IsUUID()
  id: number;

}
