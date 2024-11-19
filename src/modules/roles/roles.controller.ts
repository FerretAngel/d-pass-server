import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { RolesService as Service } from './roles.service';
import { CreateRoleDto as Dto } from './dto/create-role.dto';
import { QueryDto, QueryPage } from '~/common/decorators/query.decorator';
import { Role } from './role.entity';
import { definePermission, Perm } from '../auth/decorators/permission.decorator';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

export const permissions = definePermission('role', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const)
@Controller('role')
@ApiTags('role-角色模块')
export class RolesController {
  constructor(private readonly service: Service,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Post()
  @Perm(permissions.CREATE)
  @ApiOperation({summary:'新增'})
  async create(@Body() dto: Dto,@AuthUser() user: IAuthUser) {
    return this.service.create(dto);
  }

  @Get()
  @Perm(permissions.LIST)
  @ApiOperation({summary:'列表查询'})
  findAll(@QueryPage() query:QueryDto<Role>) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @Perm(permissions.READ)
  @ApiOperation({summary:'查询详情'})
  async findOne(@IdParam() id: number) {
    const cacheKey = `role_${id}`
    const cacheData = await this.cacheManager.get(cacheKey)
    if(cacheData){
      return cacheData
    }
    const data = await this.service.findOneAndRelations(id)
    this.cacheManager.set(cacheKey,data,30000).catch(err=>{
      console.error(`设置缓存失败:${err}`)
    })
    return data
  }

  @Patch(':id')
  @Perm(permissions.UPDATE)
  @ApiOperation({summary:'更新'})
  update(@IdParam() id: number, @Body() dto: Dto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Perm(permissions.DELETE)
  @ApiOperation({ summary: '删除' })
  remove(@IdParam() id: number) {
    return this.service.delete(id)
  }
}