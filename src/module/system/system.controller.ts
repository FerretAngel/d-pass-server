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
import { SystemService } from './system.service';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { Admin, Public } from 'src/guards/access-token.guard';
import { BaseQuery, initQueryPage } from 'src/baseModule/baseQuery';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Post()
  @Admin()
  create(@Body() createSystemDto: CreateSystemDto) {
    return this.systemService.createItem(createSystemDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: BaseQuery) {
    return this.systemService.query(initQueryPage(query));
  }
  @Post('default/:id')
  @Admin()
  setDefaultItem(@Param('id') id: string) {
    return this.systemService.setDefaultItem(+id);
  }
  @Get('default/:type')
  @Public()
  findDefault(@Param('type') type: string) {
    return this.systemService.getDefaultItem(+type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemService.findById(+id);
  }

  @Patch(':id')
  @Admin()
  update(@Param('id') id: string, @Body() updateSystemDto: UpdateSystemDto) {
    return this.systemService.update(+id, updateSystemDto);
  }

  @Delete(':id')
  @Admin()
  remove(@Param('id') id: string) {
    return this.systemService.remove(+id);
  }
}
