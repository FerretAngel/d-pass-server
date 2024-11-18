import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { QueryDto, QueryPage } from '~/common/decorators/query.decorator';
import { ArticleService as Service } from './article.service';
import { ArticleDto as Dto,Article } from './article';
import { definePermission, Perm } from '../auth/decorators/permission.decorator';
import { CaptchaService } from '../auth/services/captcha.service';
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
  constructor(private readonly service: Service,private readonly recaptchaService:CaptchaService) {}

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
  findOne(@IdParam() id: number) {
    return this.service.findOne(id);
  }

  @Get('next/:id/:token')
  @Perm(permissions.READ)
  @ApiOperation({summary:'查询下一篇文章'})
  async findNextArticle(@IdParam() id: number,@Param('token') token: string ) {
    await this.recaptchaService.checkRecapcha(token)  
    return this.service.findRecentArticle(id,'next');
  }

  @Get('prev/:id/:token')
  @Perm(permissions.READ)
  @ApiOperation({summary:'查询上一篇文章'})
  async findPrevArticle(@IdParam() id: number,@Param('token') token: string) {
    await this.recaptchaService.checkRecapcha(token)
    return this.service.findRecentArticle(id,'prev');
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