import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { QueryDto, QueryPage } from '~/common/decorators/query.decorator';
import { ArticleService as Service } from './article.service';
import { ArticleDto as Dto,Article, ArticleNextDto } from './article';
import { definePermission, Perm } from '../auth/decorators/permission.decorator';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
export const permissions = definePermission('article', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const)
@Controller('article')
@ApiTags('Article-内容模块')
export class ArticleController {
  constructor(
    private readonly service: Service,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Post()
  @ApiOperation({summary:'新增'})
  @Perm(permissions.CREATE)
  async create(@Body() dto: Dto,@AuthUser() user: IAuthUser) {
    return this.service.create(dto);
  }

  @Get()
  @Perm(permissions.LIST)
  @ApiOperation({summary:'列表查询'})
  findAll(@QueryPage() query:QueryDto<Article>) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @Perm(permissions.READ)
  @ApiOperation({summary:'查询详情'})
  async findOne(@IdParam() id: number) {
    const cacheKey = `article_${id}`
    const cached = await this.cacheManager.get(cacheKey)
    if(cached){
      return cached
    }
    const article = await this.service.findOne(id)
    const next = await this.service.findRecentArticle(id,'next')
    const prev = await this.service.findRecentArticle(id,'prev')
    const result = {...article,next,prev}
    // 30秒缓存
    this.cacheManager.set(cacheKey,result,30000).catch(err=>{
      console.error(`set cache error: ${err}`)
    })
    return result
  }

  @Get('recent/:id')
  @Perm(permissions.READ)
  @ApiOperation({summary:'查询最近文章'})
  async findRecent(@IdParam() id: number) {
    const next = await this.service.findRecentArticle(id,'next')
    const prev = await this.service.findRecentArticle(id,'prev')
    return {next,prev}
  }

  @Patch(':id')
  @Perm(permissions.UPDATE)
  @ApiOperation({summary:'更新'})
  update(@IdParam() id: number, @Body() dto: Dto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Perm(permissions.DELETE)
  @ApiOperation({summary:'删除'})
  remove(@IdParam() id: number) {
    return this.service.delete(id);
  }
}