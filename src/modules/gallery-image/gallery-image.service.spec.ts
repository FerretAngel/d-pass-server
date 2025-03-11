import { Test, TestingModule } from '@nestjs/testing';
import { GalleryImageService } from './gallery-image.service';

describe('GalleryImageService', () => {
  let service: GalleryImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GalleryImageService],
    }).compile();

    service = module.get<GalleryImageService>(GalleryImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
