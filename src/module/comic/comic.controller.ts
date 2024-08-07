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
import { ComicService } from './comic.service';
import { CreateComicDto } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';
import { Public,Admin } from 'src/guards/access-token.guard';
import { BaseQuery, initQueryPage } from 'src/baseModule/baseQuery';

@Controller('comic')
export class ComicController {
  constructor(private readonly comicService: ComicService) {}

  @Post()
  @Admin()
  create(@Body() createComicDto: CreateComicDto) {
    return this.comicService.create(createComicDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: BaseQuery) {
    return this.comicService.query(initQueryPage(query));
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.comicService.findById(+id);
  }

  @Patch(':id')
  @Admin()
  update(@Param('id') id: string, @Body() updateComicDto: UpdateComicDto) {
    return this.comicService.update(+id, updateComicDto);
  }

  @Delete(':id')
  @Admin()
  remove(@Param('id') id: string) {
    return this.comicService.remove(+id);
  }
}
