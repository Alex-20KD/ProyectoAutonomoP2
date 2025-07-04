import { Test, TestingModule } from '@nestjs/testing';
import { VisitaDomiciliariaResolver } from './visita_domiciliaria.resolver';
import { VisitaDomiciliariaService } from './visita_domiciliaria.service';

describe('VisitaDomiciliariaResolver', () => {
  let resolver: VisitaDomiciliariaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitaDomiciliariaResolver, VisitaDomiciliariaService],
    }).compile();

    resolver = module.get<VisitaDomiciliariaResolver>(VisitaDomiciliariaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
