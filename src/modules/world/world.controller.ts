import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { QueryDto, QueryPage } from '~/common/decorators/query.decorator';
import { WorldService as Service } from './world.service';
import { WorldDto as Dto, World } from './world.entity';
import { definePermission, Perm } from '../auth/decorators/permission.decorator';

export const permissions = definePermission('world', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const)
@Controller('world')
@ApiTags('World-世界模块')
export class WorldController {
  constructor(private readonly service: Service) {}

  @Post()
  @Perm(permissions.CREATE)
  @ApiOperation({ summary: '新增' })
  async create(@Body() dto: Dto, @AuthUser() user: IAuthUser) {
    return this.service.create(dto)
  }

  @Get()
  @Perm(permissions.LIST)
  @ApiOperation({ summary: '列表查询' })
  findAll(@QueryPage() query: QueryDto<World>) {
    return this.service.findAll(query)
  }

  @Get(':id')
  @Perm(permissions.READ)
  @ApiOperation({ summary: '查询详情' })
  findOne(@IdParam() id: number) {
    return this.service.findOne(id)
  }

  @Patch(':id')
  @Perm(permissions.UPDATE)
  @ApiOperation({ summary: '更新' })
  update(@IdParam() id: number, @Body() dto: Dto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  @Perm(permissions.DELETE)
  @ApiOperation({ summary: '删除' })
  remove(@IdParam() id: number) {
    return this.service.delete(id)
  }
}