import { Test, TestingModule } from '@nestjs/testing';
import { HistorialAdopcionesService } from './historial_adopciones.service';

describe('HistorialAdopcionesService', () => {
  let service: HistorialAdopcionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialAdopcionesService],
    }).compile();

    service = module.get<HistorialAdopcionesService>(HistorialAdopcionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
