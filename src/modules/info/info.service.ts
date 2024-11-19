import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '~/helper/crud/base.service';
import { Info } from './info';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Like, Repository } from 'typeorm';
import { NovelService } from '../novel/novel.service';
import { RolesService } from '../roles/roles.service';
import { DictItemService } from '../system/dict-item/dict-item.service';
import { StorageService } from '../tools/storage/storage.service';


const select:FindOneOptions<Info>['select'] = ['id','novel','title','content','remark','cover','roles','tags','createdAt']

@Injectable()
export class InfoService extends BaseService<Info>{
  constructor(
    @InjectRepository(Info)
    readonly articleRepository:Repository<Info>,
    readonly novelService:NovelService,
    @Inject(forwardRef(() => RolesService))
    readonly roleService:RolesService,
    readonly dictItemService:DictItemService,
    readonly storageService:StorageService
  ){
    super(articleRepository,{
      relations:['novel','roles','tags','cover'],
      relationsFindFunc:{
        novel:({id})=>novelService.findOne(id),
        roles:(items)=>roleService.findMany(items.map(item=>item.id)),
        tags:(items)=>dictItemService.findMany(items.map(item=>item.id)),
        cover:({id})=>storageService.findOne(id)
      },
      searchParam(key) {
        return {
          where:{
            title:Like(`%${key}%`)
          },
          select,
        }
      }
    })
  }
  async findOne(id: number): Promise<Info> {
    const item = await this.articleRepository.findOne({
      where: { id },
      relations: this.param.relations as string[],
      select,
    })
    if (!item)
      throw new NotFoundException('未找到该记录')
    return item
  }

  /**
   * 获取角色id相关文章
   */
  async findRoleArticle(id:number,maxCount:number = 10){
    return this.articleRepository.find({
      where:{roles:{id}},
      take:maxCount,
      order:{
        createdAt:'DESC'
      }
    })
  }
}
