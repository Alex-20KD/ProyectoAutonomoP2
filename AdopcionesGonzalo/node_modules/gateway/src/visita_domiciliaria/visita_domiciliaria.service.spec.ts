import { Test, TestingModule } from '@nestjs/testing';
import { VisitaDomiciliariaService } from './visita_domiciliaria.service';

describe('VisitaDomiciliariaService', () => {
  let service: VisitaDomiciliariaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitaDomiciliariaService],
    }).compile();

    service = module.get<VisitaDomiciliariaService>(VisitaDomiciliariaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
