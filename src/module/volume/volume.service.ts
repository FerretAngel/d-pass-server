import { Injectable } from '@nestjs/common';
import { CreateVolumeDto } from './dto/create-volume.dto';
import { UpdateVolumeDto } from './dto/update-volume.dto';
import { BaseService } from 'src/baseModule/baseService';
import { Volume } from './entities/volume.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VolumeService extends BaseService<Volume> {
  constructor(
    @InjectRepository(Volume)
    private readonly volumeRepository: Repository<Volume>,
  ) {
    super(volumeRepository);
  }
}
