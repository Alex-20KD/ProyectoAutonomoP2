import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateHistorialAdopcioneInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
