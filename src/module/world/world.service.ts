import { Injectable } from '@nestjs/common';
import { CreateWorldDto } from './dto/create-world.dto';
import { UpdateWorldDto } from './dto/update-world.dto';
import { BaseService } from 'src/baseModule/baseService';
import { World } from './entities/world.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WorldService extends BaseService<World> {
  constructor(
    @InjectRepository(World)
    private readonly worldRepository: Repository<World>,
  ) {
    super(worldRepository);
  }

  getByNovelId(id: number) {
    return this.worldRepository.findOne({ where: { novel: id } });
  }
}
