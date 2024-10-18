import { Injectable } from '@nestjs/common';
import { Avatar, AvatarDto } from './avatar.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '~/helper/crud/base.service';
import { StorageService } from '../tools/storage/storage.service';
@Injectable()
export class AvatarService extends BaseService<Avatar> {
  constructor(
    @InjectRepository(Avatar)
    readonly avatarRepository: Repository<Avatar>,
    readonly storageService:StorageService
  ) {
    super(avatarRepository,{
      relations:['avatar'],
      relationsFindFunc:{
        avatar:({id})=>storageService.findOne(id),
      }
    });
  }
}
