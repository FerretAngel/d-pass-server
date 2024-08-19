import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NovelService } from './novel.service';
import { NovelDto, NovelQueryDto } from './novel.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { DictItemService } from '../system/dict-item/dict-item.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('novel')
@ApiTags('Novel-小说模块')
export class NovelController {
  constructor(private readonly novelService: NovelService,
    private readonly dictService:DictItemService) {}

  @Post()
  @ApiOperation({summary:'新增小说'})
  async create(@Body() novelDto: NovelDto,@AuthUser() user: IAuthUser) {
    const {tags} = novelDto
    const dicts = await this.dictService.findMany(tags)
    return this.novelService.create({
      ...novelDto,
      user_id:user.uid,
      tags:dicts
    });
  }

  @Get()
  @ApiOperation({summary:'查询小说'})
  findAll(@Query() query:NovelQueryDto) {
    return this.novelService.list(query);
  }

  @Get(':id')
  @Public()
  @ApiOperation({summary:'查询详情'})
  findOne(@IdParam() id: number) {
    return this.novelService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary:'更新'})
  update(@IdParam() id: number, @Body() updateNovelDto: NovelDto) {
    return this.novelService.update(id, updateNovelDto);
  }

  @Delete(':id')
  remove(@IdParam() id: number) {
    return this.novelService.delete(id);
  }
}
