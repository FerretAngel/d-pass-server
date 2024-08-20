import { Injectable } from '@nestjs/common';
import { BaseService } from '~/helper/crud/base.service';
import { World } from './world.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NovelService } from '../novel/novel.service';
import { StorageService } from '../tools/storage/storage.service';

@Injectable()
export class WorldService extends BaseService<World> {
  constructor(
    @InjectRepository(World)
    readonly worldRepository:Repository<World>,
    readonly novelService:NovelService,
    readonly storageService:StorageService,
  ){
    super(worldRepository,{
      relations:['novel','covers'],
      relationsFindFunc:{
        novel:({id})=>novelService.findOne(id),
        covers:(covers)=>storageService.findMany(covers.map(item=>item.id))
      }
    })
  }
}
