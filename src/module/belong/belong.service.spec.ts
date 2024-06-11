import { Test, TestingModule } from '@nestjs/testing';
import { BelongService } from './belong.service';

describe('BelongService', () => {
  let service: BelongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BelongService],
    }).compile();

    service = module.get<BelongService>(BelongService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
