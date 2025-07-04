import { CreateAdoptanteInput } from './create-adoptante.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAdoptanteInput extends PartialType(CreateAdoptanteInput) {
  @Field(() => Int)
  id: number;
}
