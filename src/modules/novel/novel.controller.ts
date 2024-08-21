import { Body, Controller, Delete, Get, Patch, Post, Put, Query } from '@nestjs/common'

import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { IdParam } from '~/common/decorators/id-param.decorator'

import { AuthUser } from '../auth/decorators/auth-user.decorator'
import { Public } from '../auth/decorators/public.decorator'
import { DictItemService } from '../system/dict-item/dict-item.service'

import { NovelDto } from './novel.dto'
import { NovelService } from './novel.service'
import { Novel } from './entities/novel.entity'
import { QueryDto, QueryPage } from '~/common/decorators/query.decorator'

@Controller('novel')
@ApiTags('Novel-小说模块')
export class NovelController {
  constructor(private readonly novelService: NovelService, private readonly dictService: DictItemService) {}

  @Post()
  @ApiOperation({ summary: '添加数据' })
  async create(@Body() novelDto: NovelDto, @AuthUser() user: IAuthUser) {
    await this.novelService.create(novelDto)
  }

  @Get()
  @ApiOperation({ summary: '分页查询' })
  findAll(@QueryPage() query: QueryDto<Novel>) {
    return this.novelService.findAll(query)
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: '查询详情' })
  findOne(@IdParam() id: number) {
    return this.novelService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新' })
  update(@IdParam() id: number, @Body() updateNovelDto: Partial<Novel>) {
    return this.novelService.update(id, updateNovelDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除' })
  remove(@IdParam() id: number) {
    return this.novelService.delete(id)
  }
}
