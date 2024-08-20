import { Module } from '@nestjs/common'

import { RegionController } from './region.controller'
import { RegionService } from './region.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Region } from './entities/region.entity'
import { NovelModule } from '../novel/novel.module'
import { StorageModule } from '../tools/storage/storage.module'

@Module({
  imports:[TypeOrmModule.forFeature([Region]),NovelModule,StorageModule],
  controllers: [RegionController],
  providers: [RegionService],
  exports:[RegionService]
})
export class RegionModule {}
