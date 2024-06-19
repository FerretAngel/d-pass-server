import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorldService } from './world.service';
import { CreateWorldDto } from './dto/create-world.dto';
import { UpdateWorldDto } from './dto/update-world.dto';
import { Query } from 'typeorm/driver/Query';
import { initQueryPage } from 'src/baseModule/baseQuery';

@Controller('world')
export class WorldController {
  constructor(private readonly worldService: WorldService) {}

  @Post()
  create(@Body() createWorldDto: CreateWorldDto) {
    return this.worldService.create(createWorldDto);
  }

  @Get()
  findAll(@Param() query: Query) {
    return this.worldService.query(initQueryPage(query));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.worldService.getByNovelId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorldDto: UpdateWorldDto) {
    return this.worldService.update(+id, updateWorldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.worldService.remove(+id);
  }
}
