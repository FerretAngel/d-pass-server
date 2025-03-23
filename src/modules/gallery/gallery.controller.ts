import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { QueryDto, QueryPage } from '~/common/decorators/query.decorator';
import { GalleryService as Service } from './gallery.service';
import { GalleryDto as Dto, Gallery } from './gallery';
import { definePermission, Perm } from '../auth/decorators/permission.decorator';

export const permissions = definePermission('gallery', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
})
@Controller('gallery')
@ApiTags('Gallery-相册模块')
export class GalleryController {
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
  findAll(@QueryPage() query:QueryDto<Gallery>) {
    return this.service.getListOrder(query);
  }

  @Get(':id')
  @ApiOperation({summary:'查询详情'})
  @Perm(permissions.READ)
  findOne(@IdParam() id: number) {
    return this.service.getItemOrder(id);
  }

  @Patch(':id')
  @ApiOperation({summary:'更新'})
  @Perm(permissions.UPDATE)
  update(@IdParam() id: number, @Body() dto: Dto) {
    return this.service.updateOrder(id, dto);
  }

  @Delete(':id')
  @ApiOperation({summary:'删除'})
  @Perm(permissions.DELETE)
  remove(@IdParam() id: number) {
    return this.service.delete(id);
  }
}