import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { GalleryImageService } from './gallery-image.service';
import { definePermission, Perm } from '../auth/decorators/permission.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GalleryImageDto as Dto, GalleryImage } from './galleryImage';
import { QueryDto, QueryPage } from '~/common/decorators/query.decorator';
import { IdParam } from '~/common/decorators/id-param.decorator';
export const permissions = definePermission('gallery-image', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const)


@Controller('gallery-image')
@ApiTags('GalleryImage-相册图片模块')
export class GalleryImageController {
  constructor(private readonly galleryImageService: GalleryImageService) {}

  @Post()
  @ApiOperation({summary:'新增'})
  @Perm(permissions.CREATE)
  async create(@Body() dto: Dto) {
    return this.galleryImageService.create(dto);
  }

  @Get()
  @ApiOperation({summary:'列表'})
  @Perm(permissions.LIST)
  async findAll(@QueryPage() query:QueryDto<GalleryImage>) {
    return this.galleryImageService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({summary:'详情'})
  @Perm(permissions.READ)
  async findOne(@IdParam() id: number) {
    return this.galleryImageService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary:'更新'})
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body() dto: Dto) {
    return this.galleryImageService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({summary:'删除'})
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number) {
    return this.galleryImageService.delete(id);
  }
}
