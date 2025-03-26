import { Injectable } from '@nestjs/common';
import { BaseService } from '~/helper/crud/base.service';
import { GalleryImage } from './galleryImage';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageService } from '../tools/storage/storage.service';
import { Novel } from '../novel/entities/novel.entity';

@Injectable()
export class GalleryImageService extends BaseService<GalleryImage> {
  constructor(
    @InjectRepository(GalleryImage)
    readonly galleryImageRepository:Repository<GalleryImage>,
    readonly storageService:StorageService,
  ){
    super(galleryImageRepository,{
      relations:['image'],
      relationsFindFunc:{
        image:({id})=>this.storageService.findOne(id),
      }
    })
  }

  async updateOrder(list:GalleryImage[],novel:Novel){
    if (list.length === 0) return;
    // 使用事务进行批量更新
    await this.galleryImageRepository.manager.transaction(async manager => {
      const promises = list.map((item, index) => 
        manager.update(GalleryImage, item.id, { sort: index,novel })
      );
      await Promise.all(promises);
    });
  }
}
