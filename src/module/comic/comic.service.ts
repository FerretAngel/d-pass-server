import { Injectable } from '@nestjs/common';
import { CreateComicDto } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';
import { BaseService } from 'src/baseModule/baseService';
import { Comic } from './entities/comic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseQuery } from 'src/baseModule/baseQuery';

@Injectable()
export class ComicService extends BaseService<Comic> {
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Comic)
    private readonly comicRepository: Repository<Comic>,
  ) {
    super(comicRepository);
  }

  create(createDto: CreateComicDto) {
    const { urlArr, ...rest } = createDto;
    const urls = urlArr.join(',');
    return this.comicRepository.save({ urls, ...rest });
  }
  async Query(baseQuery: BaseQuery<Comic>) {
    const res = await this.query(baseQuery);
    res.list.forEach((item) => {
      item.urlArr = item.urls.split(',');
    });
    return res;
  }
}
