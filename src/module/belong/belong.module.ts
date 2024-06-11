import { Module } from '@nestjs/common';
import { BelongService } from './belong.service';
import { BelongController } from './belong.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Belong } from './entities/belong.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Belong])],
  controllers: [BelongController],
  providers: [BelongService],
  exports: [BelongService]
})
export class BelongModule {}
