import { Injectable } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { BaseService } from 'src/baseModule/baseService';
import { System, SystemType } from './entities/system.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SystemService extends BaseService<System> {
  constructor(
    @InjectRepository(System)
    private readonly systemRepository: Repository<System>,
  ) {
    super(systemRepository, false);
  }

  async createItem(createDto: Partial<System>) {
    if (createDto.default) {
      const { type } = createDto;
      const defaultItem = await this.getDefaultItem(type);
      if (defaultItem) {
        defaultItem.default = false;
        await this.systemRepository.save(defaultItem);
      }
    }
    const item = await this.systemRepository.save(createDto);
    return item;
  }

  getDefaultItem(type: System['type']) {
    return this.systemRepository.findOne({
      where: { type, default: true },
    });
  }

  async setDefaultItem(id: number) {
    // 设置默认
    const item = await this.findById(id);
    if (!item) throw new Error('未找到该项');
    const { type } = item;
    const defaultItem = await this.getDefaultItem(type);
    if (defaultItem) {
      defaultItem.default = false;
      await this.systemRepository.save(defaultItem);
    }
    item.default = true;
    return this.systemRepository.save(item);
  }
}
