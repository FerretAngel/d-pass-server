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
import { VolumeService } from './volume.service';
import { CreateVolumeDto } from './dto/create-volume.dto';
import { UpdateVolumeDto } from './dto/update-volume.dto';
import { BaseQuery, initQueryPage } from 'src/baseModule/baseQuery';
import { Admin } from 'src/guards/access-token.guard';

@Controller('volume')
export class VolumeController {
  constructor(private readonly volumeService: VolumeService) {}

  @Post()
  @Admin()
  create(@Body() createVolumeDto: CreateVolumeDto) {
    return this.volumeService.create(createVolumeDto);
  }

  @Get()
  findAll(@Query() query: BaseQuery) {
    return this.volumeService.query(initQueryPage({ ...query, parent: null }));
  }

  @Patch(':id')
  @Admin()
  update(@Param('id') id: string, @Body() updateVolumeDto: UpdateVolumeDto) {
    return this.volumeService.update(+id, updateVolumeDto);
  }

  @Delete(':id')
  @Admin()
  remove(@Param('id') id: string) {
    return this.volumeService.remove(+id);
  }
}
