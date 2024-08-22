import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '~/helper/crud/base.service';
import { Article } from './article';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NovelService } from '../novel/novel.service';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class ArticleService extends BaseService<Article>{
  constructor(
    @InjectRepository(Article)
    readonly articleRepository:Repository<Article>,
    readonly novelService:NovelService,
    readonly roleService:RolesService
  ){
    super(articleRepository,{
      relations:['novel','roles','parent'],
      relationsFindFunc:{
        novel:({id})=>novelService.findOne(id),
        roles:(items)=>roleService.findMany(items.map(item=>item.id)),
        parent:({id})=>articleRepository.findOne({where:{id}}),
      }
    })
  }
  async findOne(id: number): Promise<Article> {
    const item = await this.articleRepository.findOne({
      where: { id },
      select:['id','novel','title','content','remark','parent','roles'],
      relations: this.param.relations as string[]
    })
    if (!item)
      throw new NotFoundException('未找到该记录')
    return item
  }
}
