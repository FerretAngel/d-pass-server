import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { QueryDto, QueryPage } from '~/common/decorators/query.decorator';
import { RegionService as Service } from './region.service';
import { CreateRegionDto as Dto } from './dto/create-region.dto';
import { Region } from './entities/region.entity';
import { definePermission, Perm } from '../auth/decorators/permission.decorator';

export const permissions = definePermission('region', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const)
@Controller('region')
@ApiTags('Region-区域模块')
export class RegionController {
  constructor(private readonly service: Service) {}

  @Post()
  @ApiOperation({summary:'新增'})
  @Perm(permissions.CREATE)
  async create(@Body() dto: Dto,@AuthUser() user: IAuthUser) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({summary:'列表查询'})
  @Perm(permissions.LIST)
  findAll(@QueryPage() query:QueryDto<Region>) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @Perm(permissions.READ)
  @ApiOperation({summary:'查询详情'})
  findOne(@IdParam() id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Perm(permissions.UPDATE)
  @ApiOperation({summary:'更新'})
  update(@IdParam() id: number, @Body() dto: Dto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Perm(permissions.DELETE)
  @ApiOperation({summary:'删除'})
  remove(@IdParam() id: number) {
    return this.service.delete(id);
  }
}