import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Mascota {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
