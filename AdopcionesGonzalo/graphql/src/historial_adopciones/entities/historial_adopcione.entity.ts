import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class HistorialAdopcione {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
