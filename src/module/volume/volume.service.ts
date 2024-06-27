import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateVolumeDto } from './dto/create-volume.dto';
import { UpdateVolumeDto } from './dto/update-volume.dto';
import { BaseService } from 'src/baseModule/baseService';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BaseQuery } from 'src/baseModule/baseQuery';
import { Content } from '../content/entities/content.entity';

@Injectable()
export class VolumeService extends BaseService<Content> {
  constructor(
    @InjectRepository(Content)
    private readonly volumeRepository: Repository<Content>,
  ) {
    super(volumeRepository);
  }


  search(key: string) {
    return this.volumeRepository.find({
      where: [{ title: Like(`%${key}%`) }, { parent: null }],
    });
  }
}
