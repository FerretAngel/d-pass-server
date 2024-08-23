import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'

import { BaseService } from '~/helper/crud/base.service'

import { Region } from './entities/region.entity'
import { CreateRegionDto } from './dto/create-region.dto'
import { NovelService } from '../novel/novel.service'
import { StorageService } from '../tools/storage/storage.service'

@Injectable()
export class RegionService extends BaseService<Region> {
  constructor(
    @InjectRepository(Region)
    readonly regionRepository: Repository<Region>,
    readonly novelService: NovelService,
    readonly storageService: StorageService,
  ) {
    super(regionRepository, {
      relations:['novel','parent','avatar'],
      relationsFindFunc:{
        novel:({id})=>novelService.findOne(id),
        parent:({id})=>regionRepository.findOne({where:{id}}),
        avatar:({id})=>storageService.findOne(id),
      },
      searchParam(key) {
        return {
          where:{
            name:Like(`%${key}%`)
          }
        }
      },
    })
  }
}
