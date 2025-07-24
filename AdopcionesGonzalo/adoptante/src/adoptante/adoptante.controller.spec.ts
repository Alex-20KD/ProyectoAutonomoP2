import { Test, TestingModule } from '@nestjs/testing';
import { AdoptanteController } from './adoptante.controller';
import { AdoptanteService } from './adoptante.service';

describe('AdoptanteController', () => {
  let controller: AdoptanteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdoptanteController],
      providers: [AdoptanteService],
    }).compile();

    controller = module.get<AdoptanteController>(AdoptanteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
