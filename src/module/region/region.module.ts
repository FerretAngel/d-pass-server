import { Module } from '@nestjs/common';
import { RegionController } from './region.controller';
import { BelongModule } from '../belong/belong.module';

@Module({
  imports: [BelongModule],
  controllers: [RegionController],
})
export class RegionModule {}
