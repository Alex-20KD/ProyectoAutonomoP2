import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudAdopcionController } from './solicitud_adopcion.controller';
import { SolicitudAdopcionService } from './solicitud_adopcion.service';

describe('SolicitudAdopcionController', () => {
  let controller: SolicitudAdopcionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudAdopcionController],
      providers: [SolicitudAdopcionService],
    }).compile();

    controller = module.get<SolicitudAdopcionController>(SolicitudAdopcionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
