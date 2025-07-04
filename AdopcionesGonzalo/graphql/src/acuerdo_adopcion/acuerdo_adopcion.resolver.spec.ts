import { Test, TestingModule } from '@nestjs/testing';
import { AcuerdoAdopcionResolver } from './acuerdo_adopcion.resolver';
import { AcuerdoAdopcionService } from './acuerdo_adopcion.service';

describe('AcuerdoAdopcionResolver', () => {
  let resolver: AcuerdoAdopcionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcuerdoAdopcionResolver, AcuerdoAdopcionService],
    }).compile();

    resolver = module.get<AcuerdoAdopcionResolver>(AcuerdoAdopcionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
