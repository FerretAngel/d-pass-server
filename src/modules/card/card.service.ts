import { Injectable } from '@nestjs/common';
import { BaseService } from '~/helper/crud/base.service';
import { Card } from './card';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageService } from '../tools/storage/storage.service';

@Injectable()
export class CardService extends BaseService<Card> {
  constructor(
    @InjectRepository(Card)
    readonly cardRepository:Repository<Card>,
    readonly storageService:StorageService
  ){
    super(cardRepository,{
      relations:['back','face'],
      relationsFindFunc:{
        face:({id})=>storageService.findOne(id),
        back:({id})=>storageService.findOne(id),
      }
    })
  }
}
