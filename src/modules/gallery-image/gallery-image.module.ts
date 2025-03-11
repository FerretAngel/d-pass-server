import { Module } from '@nestjs/common';
import { GalleryImageService } from './gallery-image.service';
import { GalleryImageController } from './gallery-image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryImage } from './galleryImage';
import { StorageModule } from '../tools/storage/storage.module';

@Module({
  imports:[TypeOrmModule.forFeature([GalleryImage]),StorageModule],
  controllers: [GalleryImageController],
  providers: [GalleryImageService],
  exports:[GalleryImageService]
})
export class GalleryImageModule {}
