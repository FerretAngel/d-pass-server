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
import { Public } from 'src/guards/access-token.guard';
import { BaseQuery, initQueryPage } from 'src/baseModule/baseQuery';

@Controller('comic')
export class ComicController {
  constructor(private readonly comicService: ComicService) {}

  @Post()
  create(@Body() createComicDto: CreateComicDto) {
    return this.comicService.create(createComicDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: BaseQuery) {
    return this.comicService.Query(initQueryPage(query));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comicService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComicDto: UpdateComicDto) {
    return this.comicService.updateComic(+id, updateComicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comicService.remove(+id);
  }
}
