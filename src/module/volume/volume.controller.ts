import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VolumeService } from './volume.service';
import { CreateVolumeDto } from './dto/create-volume.dto';
import { UpdateVolumeDto } from './dto/update-volume.dto';
import { Query } from 'typeorm/driver/Query';
import { initQueryPage } from 'src/baseModule/baseQuery';
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
  findAll(@Param() query: Query) {
    return this.volumeService.query(initQueryPage(query));
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
