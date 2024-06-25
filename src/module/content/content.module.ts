import { Module, forwardRef } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { NovelModule } from '../novel/novel.module';
import { VolumeModule } from '../volume/volume.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
    NovelModule,
    forwardRef(() => VolumeModule),
  ],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
