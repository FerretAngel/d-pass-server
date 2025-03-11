import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './gallery';
import { NovelModule } from '../novel/novel.module';
import { GalleryImageModule } from '../gallery-image/gallery-image.module';
import { StorageModule } from '../tools/storage/storage.module';
@Module({
  imports:[TypeOrmModule.forFeature([Gallery]),NovelModule,GalleryImageModule,StorageModule],
  controllers: [GalleryController],
  providers: [GalleryService],
  exports:[GalleryService]
})
export class GalleryModule {}
