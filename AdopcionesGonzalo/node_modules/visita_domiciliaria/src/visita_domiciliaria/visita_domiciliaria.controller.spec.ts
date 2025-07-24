import { Test, TestingModule } from '@nestjs/testing';
import { VisitaDomiciliariaController } from './visita_domiciliaria.controller';
import { VisitaDomiciliariaService } from './visita_domiciliaria.service';

describe('VisitaDomiciliariaController', () => {
  let controller: VisitaDomiciliariaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitaDomiciliariaController],
      providers: [VisitaDomiciliariaService],
    }).compile();

    controller = module.get<VisitaDomiciliariaController>(VisitaDomiciliariaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
