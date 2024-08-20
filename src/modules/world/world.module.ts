import { Module } from '@nestjs/common';
import { WorldService } from './world.service';
import { WorldController } from './world.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { World } from './world.entity';
import { NovelModule } from '../novel/novel.module';
import { StorageModule } from '../tools/storage/storage.module';

@Module({
  imports:[TypeOrmModule.forFeature([World]),NovelModule,StorageModule],
  controllers: [WorldController],
  providers: [WorldService],
  exports:[WorldService]
})
export class WorldModule {}
