import { Test, TestingModule } from '@nestjs/testing';
import { BelongController } from './belong.controller';
import { BelongService } from './belong.service';

describe('BelongController', () => {
  let controller: BelongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BelongController],
      providers: [BelongService],
    }).compile();

    controller = module.get<BelongController>(BelongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
