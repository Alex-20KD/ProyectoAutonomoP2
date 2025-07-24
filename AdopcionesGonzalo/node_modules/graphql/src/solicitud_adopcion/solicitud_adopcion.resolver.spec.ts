import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudAdopcionResolver } from './solicitud_adopcion.resolver';
import { SolicitudAdopcionService } from './solicitud_adopcion.service';

describe('SolicitudAdopcionResolver', () => {
  let resolver: SolicitudAdopcionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolicitudAdopcionResolver, SolicitudAdopcionService],
    }).compile();

    resolver = module.get<SolicitudAdopcionResolver>(SolicitudAdopcionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
