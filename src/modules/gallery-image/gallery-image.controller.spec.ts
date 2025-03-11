import { Test, TestingModule } from '@nestjs/testing';
import { GalleryImageController } from './gallery-image.controller';
import { GalleryImageService } from './gallery-image.service';

describe('GalleryImageController', () => {
  let controller: GalleryImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GalleryImageController],
      providers: [GalleryImageService],
    }).compile();

    controller = module.get<GalleryImageController>(GalleryImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
