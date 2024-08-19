import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BaseService } from '~/helper/crud/base.service'

import { Region } from './entities/region.entity'

@Injectable()
export class RegionService extends BaseService<Region> {
  constructor(
    @InjectRepository(Region)
    regionRepository: Repository<Region>,
  ) {
    super(regionRepository)
  }
}
