import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '~/helper/crud/base.service';
import { Article } from './article';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, IsNull, LessThan, Like, MoreThan, Not, Repository } from 'typeorm';
import { NovelService } from '../novel/novel.service';
import { RolesService } from '../roles/roles.service';

const select:FindOneOptions<Article>['select'] = ['id','novel','title','content','remark','roles','createdAt','order']

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

  async getNextOne(item:Article,relations?:string[],select?:FindOneOptions<Article>['select']){
    return this.articleRepository.findOne({
      where:[
        // 情况1：order 大于当前文章
        {
          id:Not(item.id),
          order:MoreThan(item.order),
          parent:item.parent ? {id:item.parent.id} : IsNull()
        },
        // 情况2：order 相同，但创建时间更晚
        {
          id:Not(item.id),
          order:item.order,
          createdAt:MoreThan(item.createdAt),
          parent:item.parent ? {id:item.parent.id} : IsNull()
        }
      ],
      order:{
        order:'ASC',
        createdAt:'ASC'
      }
    })
  }

  async getPrevOne(item:Article,relations?:string[],select?:FindOneOptions<Article>['select']){
    return this.articleRepository.findOne({
      where:[
        {
          id:Not(item.id),
          order:LessThan(item.order),
          parent:item.parent ? {id:item.parent.id} : IsNull()
        },
        {
          id:Not(item.id),
          order:item.order,
          createdAt:LessThan(item.createdAt),
          parent:item.parent ? {id:item.parent.id} : IsNull()
        }
      ],
      order:{
        order:'DESC',
        createdAt:'DESC'
      }
    })
  }

  async getFirstOne(id:number){
    return this.articleRepository.findOne({
      where:{
        parent:{id}
      },
      order:{
        order:'ASC',
        createdAt:'ASC'
      }
    })
  }
  async getLastOne(id:number){
    return this.articleRepository.findOne({
      where:{parent:{id}},
      order:{order:'DESC',createdAt:'DESC'}
    })
  }

  /**
   * 查询下一篇文章
   * @param currentId 当前文章id
   * @returns 
   */
  async findRecentArticle(currentId: number,type:'next'|'prev' = 'next'): Promise<Article | null> {
    // 获取当前文章信息，包括父级信息
    const currentArticle = await this.articleRepository.findOne({
      where: { id: currentId },
      relations: ['parent'],
      select: ['id', 'order', 'parent', 'createdAt']
    });
  
    if (!currentArticle) {
      throw new NotFoundException('当前文章不存在');
    }
  
    // 先尝试查找同级的下一篇文章
    let nextArticle = await (
      type === 'next' ? this.getNextOne(currentArticle) : this.getPrevOne(currentArticle)
    )
  
    // 如果同级没有下一篇，且当前文章有父级，则查找下一父级的第一篇
    if (!nextArticle && currentArticle.parent) {
      const nextParent = await (
        type === 'next' ? this.getNextOne(currentArticle.parent) : this.getPrevOne(currentArticle.parent)
      )
      if(nextParent){
        nextArticle = await (
          type === 'next' ? this.getFirstOne(nextParent.id) : this.getLastOne(nextParent.id)
        )
      }
    }
  
    return nextArticle;
  }
}
