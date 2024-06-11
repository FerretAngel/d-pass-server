import { Module } from '@nestjs/common';
import { ComicService } from './comic.service';
import { ComicController } from './comic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comic } from './entities/comic.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Comic])],
  controllers: [ComicController],
  providers: [ComicService],
  exports: [ComicService]
})
export class ComicModule {}
