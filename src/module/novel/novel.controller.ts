import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  Query,
} from '@nestjs/common';
import { NovelService } from './novel.service';
import { CreateNovelDto } from './dto/create-novel.dto';
import { UpdateNovelDto } from './dto/update-novel.dto';
import { REQUEST_USER_KEY } from '../auth/access-token.guard';
import { Admin, Public } from 'src/guards/access-token.guard';
import { BaseQuery, initQueryPage } from 'src/baseModule/baseQuery';

@Controller('novel')
export class NovelController {
  constructor(private readonly novelService: NovelService) {}

  @Get('all')
  @Public()
  async findAll() {
    return this.novelService.queryAll();
  }

  @Get()
  @Public()
  async query(@Query() query: BaseQuery) {
    return this.novelService.queryNovel(initQueryPage(query));
  }

  @Get('tags')
  @Public()
  async queryTags() {
    return this.novelService.getTags();
  }

  @Post()
  @Admin()
  async create(@Request() req: any, @Body() createNovelDto: CreateNovelDto) {
    const { fingerprint } = (await req[REQUEST_USER_KEY]) ?? {};
    if (!fingerprint) throw new Error('未获取到浏览器指纹');
    return this.novelService.addNovel(fingerprint, createNovelDto);
  }

  @Patch(':id')
  @Admin()
  async update(
    @Param('id') id: string,
    @Body() updateNovelDto: UpdateNovelDto,
  ) {
    return this.novelService.updateNovel(+id, updateNovelDto);
  }

  @Delete(':id')
  @Admin()
  async remove(@Param('id') id: string) {
    return this.novelService.deleteNovel(+id);
  }
}
