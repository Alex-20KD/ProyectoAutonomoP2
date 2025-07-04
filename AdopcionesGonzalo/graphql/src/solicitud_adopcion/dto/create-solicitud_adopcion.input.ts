import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSolicitudAdopcionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
