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
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { BelongService } from '../belong/belong.service';
import { BaseQuery, initQueryPage } from 'src/baseModule/baseQuery';
import { Admin, Public } from 'src/guards/access-token.guard';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: BelongService) {}

  @Post()
  @Admin()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: BaseQuery) {
    return this.regionService.query(initQueryPage(query));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findById(+id);
  }

  @Patch(':id')
  @Admin()
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @Delete(':id')
  @Admin()
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
