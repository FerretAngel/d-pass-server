import { Module } from '@nestjs/common'

import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './role.entity'
import { RegionModule } from '../region/region.module'
import { NovelModule } from '../novel/novel.module'
import { StorageModule } from '../tools/storage/storage.module'

@Module({
  imports:[TypeOrmModule.forFeature([Role]),RegionModule,NovelModule,StorageModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports:[RolesService]
})
export class RolesModule {}
