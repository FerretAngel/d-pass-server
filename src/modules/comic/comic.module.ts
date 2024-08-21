import { Module } from '@nestjs/common';
import { ComicService } from './comic.service';
import { ComicController } from './comic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comic } from './comic';
import { NovelModule } from '../novel/novel.module';
import { StorageModule } from '../tools/storage/storage.module';

@Module({
  imports:[TypeOrmModule.forFeature([Comic]),NovelModule,StorageModule],
  controllers: [ComicController],
  providers: [ComicService],
  exports:[ComicService]
})
export class ComicModule {}
