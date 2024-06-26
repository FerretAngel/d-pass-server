import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Admin, Public } from 'src/guards/access-token.guard';
import { BaseQuery, initQueryPage } from 'src/baseModule/baseQuery';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @Admin()
  async create(@Body() createContentDto: CreateContentDto) {
    const { type, avatar, volumeId } = createContentDto;
    if (type === 1 && !avatar) throw new Error('资讯必须有封面');
    if (volumeId) {
      delete createContentDto.volumeId;
    }
    const content = await this.contentService.create(createContentDto);
    if (volumeId && type === 0) {
      await this.contentService.updateVolume(content, volumeId);
    }
  }

  @Get()
  @Public()
  findAll(@Query() query: BaseQuery) {
    return this.contentService.query(initQueryPage(query));
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    const ID = +id;
    if (isNaN(ID)) throw new Error('id必须为数字');
    const content = await this.contentService.findOne(+id);
    if (!content) throw new Error('内容不存在');
    return content;
  }

  @Public()
  @Get('ids/:ids')
  async findByIds(@Param('ids') ids: string) {
    const ID = ids.split(',').map((item) => +item);
    if (ID.some((item) => isNaN(item))) throw new Error('id必须为数字');
    return this.contentService.findByIds(ID);
  }

  @Patch(':id')
  @Admin()
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(+id, updateContentDto);
  }

  @Delete(':id')
  @Admin()
  remove(@Param('id') id: string) {
    return this.contentService.remove(+id);
  }
}
