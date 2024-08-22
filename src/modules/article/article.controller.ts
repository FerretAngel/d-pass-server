import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { QueryDto, QueryPage } from '~/common/decorators/query.decorator';
import { ArticleService as Service } from './article.service';
import { ArticleDto as Dto,Article } from './article';

@Controller('article')
@ApiTags('Article-内容模块')
export class ArticleController {
  constructor(private readonly service: Service) {}

  @Post()
  @ApiOperation({summary:'新增'})
  async create(@Body() dto: Dto,@AuthUser() user: IAuthUser) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({summary:'列表查询'})
  findAll(@QueryPage() query:QueryDto<Article>) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @Public()
  @ApiOperation({summary:'查询详情'})
  findOne(@IdParam() id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary:'更新'})
  update(@IdParam() id: number, @Body() dto: Dto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({summary:'删除'})
  remove(@IdParam() id: number) {
    return this.service.delete(id);
  }
}