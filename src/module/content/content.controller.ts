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
  create(@Body() createContentDto: CreateContentDto) {
    const { news, avatar } = createContentDto;
    if (news && !avatar) throw new Error('咨询必须有封面');
    return this.contentService.create(createContentDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: BaseQuery) {
    return this.contentService.query(initQueryPage(query));
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    const content = await this.contentService.findOne(+id);
    if (!content) throw new Error('内容不存在');
    return content;
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
