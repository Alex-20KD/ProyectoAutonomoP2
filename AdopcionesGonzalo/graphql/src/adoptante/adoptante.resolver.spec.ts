import { Test, TestingModule } from '@nestjs/testing';
import { AdoptanteResolver } from './adoptante.resolver';
import { AdoptanteService } from './adoptante.service';

describe('AdoptanteResolver', () => {
  let resolver: AdoptanteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdoptanteResolver, AdoptanteService],
    }).compile();

    resolver = module.get<AdoptanteResolver>(AdoptanteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
