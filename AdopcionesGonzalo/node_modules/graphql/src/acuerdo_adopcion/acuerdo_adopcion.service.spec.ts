import { Test, TestingModule } from '@nestjs/testing';
import { AcuerdoAdopcionService } from './acuerdo_adopcion.service';

describe('AcuerdoAdopcionService', () => {
  let service: AcuerdoAdopcionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcuerdoAdopcionService],
    }).compile();

    service = module.get<AcuerdoAdopcionService>(AcuerdoAdopcionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
