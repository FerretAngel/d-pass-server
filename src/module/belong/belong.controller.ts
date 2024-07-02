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
import { BelongService } from './belong.service';
import { CreateBelongDto } from './dto/create-belong.dto';
import { UpdateBelongDto } from './dto/update-belong.dto';
import { BaseQuery, initQueryPage } from 'src/baseModule/baseQuery';
import { Admin, Public } from 'src/guards/access-token.guard';

@Controller('belong')
export class BelongController {
  constructor(private readonly belongService: BelongService) {}

  @Post()
  @Admin()
  create(@Body() createBelongDto: CreateBelongDto) {
    return this.belongService.create(createBelongDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: BaseQuery) {
    return this.belongService.query(initQueryPage(query));
  }

  @Patch(':id')
  @Admin()
  update(@Param('id') id: string, @Body() updateBelongDto: UpdateBelongDto) {
    return this.belongService.update(+id, updateBelongDto);
  }

  @Delete(':id')
  @Admin()
  remove(@Param('id') id: string) {
    return this.belongService.remove(+id);
  }
}
