import { Test, TestingModule } from '@nestjs/testing';
import { HistorialAdopcionesController } from './historial_adopciones.controller';
import { HistorialAdopcioneService } from './historial_adopciones.service';

describe('HistorialAdopcionesController', () => {
  let controller: HistorialAdopcionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialAdopcionesController],
      providers: [HistorialAdopcioneService],
    }).compile();

    controller = module.get<HistorialAdopcionesController>(HistorialAdopcionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
