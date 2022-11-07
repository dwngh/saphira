import { Test, TestingModule } from '@nestjs/testing';
import { SpecialitysController } from './specialitys.controller';
import { SpecialitysService } from './specialitys.service';

describe('SpecialitysController', () => {
  let controller: SpecialitysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialitysController],
      providers: [SpecialitysService],
    }).compile();

    controller = module.get<SpecialitysController>(SpecialitysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
