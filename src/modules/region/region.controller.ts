import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'

import { CreateRegionDto } from './dto/create-region.dto'
import { RegionService } from './region.service'

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto)
  }

  @Get()
  findAll() {
    return this.regionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id)
  }
}
