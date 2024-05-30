import { Module } from '@nestjs/common';
import { VolumeService } from './volume.service';
import { VolumeController } from './volume.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Volume } from './entities/volume.entity';
import { ContentModule } from '../content/content.module';
import { NovelModule } from '../novel/novel.module';

@Module({
  imports: [TypeOrmModule.forFeature([Volume]), ContentModule, NovelModule],
  controllers: [VolumeController],
  providers: [VolumeService],
})
export class VolumeModule {}
