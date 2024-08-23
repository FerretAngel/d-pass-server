import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '~/helper/crud/base.service';
import { Article } from './article';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, IsNull, Like, Not, Repository } from 'typeorm';
import { NovelService } from '../novel/novel.service';
import { RolesService } from '../roles/roles.service';

const select:FindOneOptions<Article>['select'] = ['id','novel','title','content','remark','roles','createdAt']

@Injectable()
export class ArticleService extends BaseService<Article>{
  constructor(
    @InjectRepository(Article)
    readonly articleRepository:Repository<Article>,
    readonly novelService:NovelService,
    readonly roleService:RolesService
  ){
    super(articleRepository,{
      searchParam(key) {
        return {
          where:{
            title:Like(`%${key}%`),
            parent:Not(IsNull()),
          },
          select:['id','title','content','remark','createdAt'],
        }
      },
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
      relations: this.param.relations as string[],
      select,
    })
    if (!item)
      throw new NotFoundException('未找到该记录')
    return item
  }

  async searchParent(key:string){
   return this.articleRepository.find({
      where:{
        parent:IsNull(),
        title:Like(`%${key}%`)
      },
      select:['id','title','content','remark','createdAt'],
    })
  }
}
