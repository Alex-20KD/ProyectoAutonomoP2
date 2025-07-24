import { Test, TestingModule } from '@nestjs/testing';
import { MascotaResolver } from './mascota.resolver';
import { MascotaService } from './mascota.service';

describe('MascotaResolver', () => {
  let resolver: MascotaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MascotaResolver, MascotaService],
    }).compile();

    resolver = module.get<MascotaResolver>(MascotaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
