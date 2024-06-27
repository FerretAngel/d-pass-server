import { Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/baseModule/baseService';
import { Repository, Like } from 'typeorm';
import { Info } from './entities/info.entity';

@Injectable()
export class InfoService extends BaseService<Info> {
  constructor(
    @InjectRepository(Info)
    private readonly infoRepository: Repository<Info>,
  ) {
    super(infoRepository);
  }
  findOne(id: number) {
    return this.infoRepository
      .createQueryBuilder('info')
      .addSelect('info.content')
      .where('info.id = :id', { id })
      .getOne();
  }

  search(key: string) {
    return this.infoRepository.find({
      where: [{ title: Like(`%${key}%`) }],
    });
  }
}
