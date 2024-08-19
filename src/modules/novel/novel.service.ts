import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BaseService } from '~/helper/crud/base.service'

import { Novel } from './entities/novel.entity'

@Injectable()
export class NovelService extends BaseService<Novel> {
  constructor(
    @InjectRepository(Novel)
    private novelRepository: Repository<Novel>,
  ) {
    super(novelRepository)
  }
}
