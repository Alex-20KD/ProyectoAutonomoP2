// api-gateway/src/modules/adoptante-gateway/adoptante-gateway.module.ts
import { Module } from '@nestjs/common'; // <-- ¡Asegúrate de que Module esté importado!
import { HttpModule } from '@nestjs/axios';
import { AdoptanteResolver } from './adoptante.resolver';
import { AdoptanteClientService } from './adoptante-client.service';

@Module({ // <-- ¡Asegúrate de que este decorador esté presente!
  imports: [HttpModule],
  providers: [AdoptanteResolver, AdoptanteClientService],
  exports: [AdoptanteClientService]
})
export class AdoptanteGatewayModule {} // <-- Y que la clase esté exportada