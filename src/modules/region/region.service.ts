import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

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
      }
    })
  }
  // async create(dto: CreateRegionDto) {
  //   const { parent_id, avatar_id, novel_id } = dto
  //   const novel = novel_id && await this.novelService.findOne(novel_id)
  //   const avatar = avatar_id && await this.storageService.findOne(avatar_id)
  //   const parent = parent_id && await this.findOne(parent_id)
  //   return await this.regionRepository.save({
  //     ...dto,
  //     novel,
  //     parent,
  //     avatar
  //   })
  // }

  // async update(id: number, dto: Partial<Region & CreateRegionDto>) {
  //   const region = await this.findOne(id)
  //   if (!region) throw new Error('区域不存在！')
  //   const { parent_id, avatar_id, novel_id } = dto
  //   const novel = novel_id && await this.novelService.findOne(novel_id)
  //   const avatar = avatar_id && await this.storageService.findOne(avatar_id)
  //   const parent = parent_id && await this.findOne(parent_id)
  //   await this.regionRepository.update(id, {
  //     ...region,
  //     ...dto,
  //     novel,
  //     parent,
  //     avatar,
  //   })
  // }
}
