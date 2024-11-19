import { forwardRef, Inject, Injectable } from '@nestjs/common'

import { BaseService } from '~/helper/crud/base.service'
import { Role } from './role.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { StorageService } from '../tools/storage/storage.service'
import { RegionService } from '../region/region.service'
import { NovelService } from '../novel/novel.service'
import { ArticleService } from '../article/article.service'
import { InfoService } from '../info/info.service'

@Injectable()
export class RolesService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    readonly storageService: StorageService,
    readonly regionService: RegionService,
    readonly novelService: NovelService,
    @Inject(forwardRef(() => ArticleService))
    readonly articleService: ArticleService,
    @Inject(forwardRef(() => InfoService))
    readonly infoService: InfoService
  ) {
    super(roleRepository, {
      relations: ['novel', 'avatar', 'drawing', 'region','region.avatar'],
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
  /**
   * 获取角色详情和相关文章
   */
  async findOneAndRelations(id:number){
    const role = await this.findOne(id)
    const articles = await this.articleService.findRoleArticle(id,3)
    const infos = await this.infoService.findRoleArticle(id,3)
    return {
      ...role,
      articles,
      infos
    }
  }
}
