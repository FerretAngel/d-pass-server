import { Injectable } from '@nestjs/common';
import { UpdateBelongDto } from './dto/update-belong.dto';
import { BaseService } from 'src/baseModule/baseService';
import { Belong } from './entities/belong.entity';
import { InjectRepository } from '@nestjs/typeorm';
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
