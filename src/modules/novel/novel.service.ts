import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BaseService } from '~/helper/crud/base.service'

import { Novel } from './entities/novel.entity'
import { DictItemService } from '../system/dict-item/dict-item.service'
import { UserService } from '../user/user.service'
import { StorageService } from '../tools/storage/storage.service'

@Injectable()
export class NovelService extends BaseService<Novel> {
  constructor(
    @InjectRepository(Novel)
    private novelRepository: Repository<Novel>,
    private readonly userService:UserService,
    private readonly dictService: DictItemService,
    private readonly storageService:StorageService
  ) {
    super(novelRepository,{
      relations:['author','tags','cover'],
      relationsFindFunc:{
        author:(user)=>userService.findUserById(user.id),
        cover:({id})=>storageService.findOne(id),
        tags:(tags)=>dictService.findMany(tags.map(item=>item.id))
      }
    })
  }
}
