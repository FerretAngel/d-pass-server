import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { QueryDto, QueryPage } from '~/common/decorators/query.decorator';
import { AvatarService as Service } from './avatar.service';
import { Avatar, AvatarDto as Dto } from './avatar.entity';
import { definePermission, Perm } from '../auth/decorators/permission.decorator';

export const permissions = definePermission('avatar', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const)
@Controller('avatar')
@ApiTags('Avatar-模块')
export class AvatarController {
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
  findAll(@QueryPage() query:QueryDto<Avatar>) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @Perm(permissions.READ)
  @ApiOperation({summary:'查询详情'})
  findOne(@IdParam() id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary:'更新'})
  @Perm(permissions.UPDATE)
  update(@IdParam() id: number, @Body() dto: Dto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({summary:'删除'})
  @Perm(permissions.DELETE)
  remove(@IdParam() id: number) {
    return this.service.delete(id);
  }
}