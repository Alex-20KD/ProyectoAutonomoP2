import { Test, TestingModule } from '@nestjs/testing';
import { AcuerdoAdopcionController } from './acuerdo_adopcion.controller';
import { AcuerdoAdopcionService } from './acuerdo_adopcion.service';

describe('AcuerdoAdopcionController', () => {
  let controller: AcuerdoAdopcionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcuerdoAdopcionController],
      providers: [AcuerdoAdopcionService],
    }).compile();

    controller = module.get<AcuerdoAdopcionController>(AcuerdoAdopcionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
