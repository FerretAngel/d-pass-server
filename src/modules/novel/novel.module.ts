import { Module } from '@nestjs/common';
import { NovelService } from './novel.service';
import { NovelController } from './novel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Novel } from './entities/novel.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Novel])],
  controllers: [NovelController],
  providers: [NovelService],
  exports:[TypeOrmModule,NovelService]
})
export class NovelModule {}
