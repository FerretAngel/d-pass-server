import { Injectable } from '@nestjs/common';
import { BaseService } from '~/helper/crud/base.service';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RegionService extends BaseService<Region> {
  constructor(
    @InjectRepository(Region)
    regionRepository:Repository<Region>
  ){
    super(regionRepository)
  }
}
