// api-gateway/src/modules/adoptante-gateway/dto/update-adoptante.input.ts
import { InputType, PartialType } from '@nestjs/graphql'; // <-- ¡VERIFICA ESTA LÍNEA! InputType debe estar aquí.
import { CreateAdoptanteInput } from './create-adoptante.input';

@InputType() // <-- ¡VERIFICA QUE ESTÉ ESTE DECORADOR AQUÍ!
export class UpdateAdoptanteInput extends PartialType(CreateAdoptanteInput) {
  // Si el ID se pasa como parte del input (aunque en GraphQL es más común como argumento de la mutación)
  // @Field(() => ID)
  // id?: string;
}