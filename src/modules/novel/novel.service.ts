import { Injectable } from '@nestjs/common';
import { BaseService } from '~/helper/crud/base.service';
import { Novel } from './entities/novel.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NovelDto } from './novel.dto';
import { DictItemService } from '../system/dict-item/dict-item.service';

@Injectable()
export class NovelService extends BaseService<Novel> {
  constructor(
    @InjectRepository(Novel)
    private novelRepository: Repository<Novel>,
  ){
    super(novelRepository)
  }
}
