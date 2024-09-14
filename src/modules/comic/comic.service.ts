import { Injectable } from '@nestjs/common';
import { BaseService } from '~/helper/crud/base.service';
import { Comic } from './comic';
import { Like, Repository } from 'typeorm';
import { NovelService } from '../novel/novel.service';
import { StorageService } from '../tools/storage/storage.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ComicService extends BaseService<Comic> {
  constructor(
    @InjectRepository(Comic)
    readonly comicRepository:Repository<Comic>,
    readonly novelService:NovelService,
    readonly storageService:StorageService,
  ){
    super(comicRepository,{
      searchParam(key) {
        return {
          where:{
            title:Like(`%${key}%`)
          }
        }
      },
      relations:['novel','images','parent'],
      relationsFindFunc:{
        novel:({id})=>novelService.findOne(id),
        parent:({id})=>comicRepository.findOne({where:{id}}),
        images:(ids)=>storageService.findMany(ids.map(i=>i.id))
      }
    })
  }
}
