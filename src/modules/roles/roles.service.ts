import { Injectable } from '@nestjs/common'

import { BaseService } from '~/helper/crud/base.service'
import { Role } from './role.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { StorageService } from '../tools/storage/storage.service'
import { RegionService } from '../region/region.service'
import { NovelService } from '../novel/novel.service'

@Injectable()
export class RolesService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    readonly storageService: StorageService,
    readonly regionService: RegionService,
    readonly novelService: NovelService,
  ) {
    super(roleRepository, {
      relations: ['novel', 'avatar', 'drawing', 'region'],
      relationsFindFunc: {
        novel: ({ id }) => novelService.findOne(id),
        avatar: ({ id }) => storageService.findOne(id),
        drawing: ({ id }) => storageService.findOne(id),
        region: ({ id }) => regionService.findOne(id),
      },
      searchParam(key) {
        return {
          where: [
            {
              name: Like(`%${key}%`),
            },
            {
              hobby: Like(`%${key}%`)
            },
            {
              describe: Like(`%${key}%`)
            },
            {
              ability: Like(`%${key}%`)
            },
            {
              occupation: Like(`%${key}%`)
            },
          ]
        }
      },
    })
  }
}
