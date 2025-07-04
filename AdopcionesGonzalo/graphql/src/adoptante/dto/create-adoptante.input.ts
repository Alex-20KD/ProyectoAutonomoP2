import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAdoptanteInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
