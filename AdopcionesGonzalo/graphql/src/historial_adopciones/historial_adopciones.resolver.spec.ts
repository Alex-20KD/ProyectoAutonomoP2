import { Test, TestingModule } from '@nestjs/testing';
import { HistorialAdopcionesResolver } from './historial_adopciones.resolver';
import { HistorialAdopcionesService } from './historial_adopciones.service';

describe('HistorialAdopcionesResolver', () => {
  let resolver: HistorialAdopcionesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialAdopcionesResolver, HistorialAdopcionesService],
    }).compile();

    resolver = module.get<HistorialAdopcionesResolver>(HistorialAdopcionesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
