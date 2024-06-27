import { Injectable } from '@nestjs/common';
import { CreateComicDto } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';
import { BaseService } from 'src/baseModule/baseService';
import { Comic } from './entities/comic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BaseQuery } from 'src/baseModule/baseQuery';

@Injectable()
export class ComicService extends BaseService<Comic> {
  constructor(
    @InjectRepository(Comic)
    private readonly comicRepository: Repository<Comic>,
  ) {
    super(comicRepository);
  }

  search(key: string) {
    return this.comicRepository.find({
      where: [{ title: Like(`%${key}%`) }],
    });
  }
}
