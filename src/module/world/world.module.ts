import { Module } from '@nestjs/common';
import { WorldService } from './world.service';
import { WorldController } from './world.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { World } from './entities/world.entity';

@Module({
  imports:[TypeOrmModule.forFeature([World])],
  controllers: [WorldController],
  providers: [WorldService],
})
export class WorldModule {}
