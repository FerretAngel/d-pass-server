import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '~/helper/crud/base.service'; 
import { Gallery } from './gallery';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NovelService } from '../novel/novel.service';
import { GalleryImageService } from '../gallery-image/gallery-image.service';
import { StorageService } from '../tools/storage/storage.service';
import { QueryDto } from '~/common/decorators/query.decorator';
@Injectable()
export class GalleryService extends BaseService<Gallery> {
  constructor(
    @InjectRepository(Gallery)
    readonly galleryRepository:Repository<Gallery>,
    readonly novelService:NovelService,
    readonly galleryImageService:GalleryImageService,
    readonly storageService:StorageService
  ){
    super(galleryRepository,{
      relations:['novel','images','images.image','cover'],
      relationsFindFunc:{
        novel:({id})=>this.novelService.findOne(id),
        images: (list)=>this.galleryImageService.findMany(list.map(i=>i.id)),
        cover:({id})=>this.storageService.findOne(id)
      }
    })
  }
  async updateOrder(id:number,entity:Partial<Gallery>){
    const novel = await this.novelService.findOne(entity.novel.id)
    await this.galleryImageService.updateOrder(entity.images,novel)
    return this.update(id,entity)
  }


  async queryList(query:QueryDto<Gallery>){
    const [list,total] = await this.galleryRepository.findAndCount({
      take: query.take,
      skip: query.skip,
      where: query.where,
      relations: ['cover'],
    })
    return query.getReturn(list, total)
  }

  async queryItem(id:number){
    const item = await this.galleryRepository.findOne({
      where:{id},
      relations:['cover','images','images.image'],
    })
    if(!item) throw new NotFoundException('未找到该记录')
    return {
      ...item,
      images:item.images.sort((a,b)=>a.sort-b.sort)
    }
  }
}
