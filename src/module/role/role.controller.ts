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
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Admin, Public } from 'src/guards/access-token.guard';
import { BaseQuery, initQueryPage } from 'src/baseModule/baseQuery';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get()
  @Public()
  query(@Query() query: BaseQuery) {
    return this.roleService.query(initQueryPage(query));
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.roleService.findByNovelIds([+id]);
  }

  @Post()
  @Admin()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Patch(':id')
  @Admin()
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @Admin()
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
