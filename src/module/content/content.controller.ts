import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Admin, Public } from 'src/guards/access-token.guard';
import { BaseQuery } from 'src/baseModule/baseQuery';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @Admin()
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentService.create(createContentDto);
  }

  @Get()
  @Public()
  findAll(@Body() query: BaseQuery) {
    return this.contentService.query(query);
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
