import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/baseModule/baseService';
import { InjectRepository } from '@nestjs/typeorm';
import { Belong } from './entities/belong.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BelongService extends BaseService<Belong> {
  constructor(
    @InjectRepository(Belong)
    private readonly belongRepository: Repository<Belong>,
  ) {
    super(belongRepository);
  }
}
