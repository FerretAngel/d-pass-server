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
import { InfoService } from './info.service';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { BaseQuery, initQueryPage } from 'src/baseModule/baseQuery';
import { Admin, Public } from 'src/guards/access-token.guard';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post()
  @Admin()
  create(@Body() createInfoDto: CreateInfoDto) {
    return this.infoService.create(createInfoDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: BaseQuery) {
    return this.infoService.query(initQueryPage(query));
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.infoService.findOne(+id);
  }

  @Patch(':id')
  @Admin()
  update(@Param('id') id: string, @Body() updateInfoDto: UpdateInfoDto) {
    return this.infoService.update(+id, updateInfoDto);
  }

  @Delete(':id')
  @Admin()
  remove(@Param('id') id: string) {
    return this.infoService.remove(+id);
  }
}
