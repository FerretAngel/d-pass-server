import { Injectable } from '@nestjs/common';
import { CreateVolumeDto } from './dto/create-volume.dto';
import { UpdateVolumeDto } from './dto/update-volume.dto';
import { BaseService } from 'src/baseModule/baseService';
import { Volume } from './entities/volume.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseQuery } from 'src/baseModule/baseQuery';
import { Content } from '../content/entities/content.entity';
import { ContentService } from '../content/content.service';

@Injectable()
export class VolumeService extends BaseService<Volume> {
  constructor(
    @InjectRepository(Volume)
    private readonly volumeRepository: Repository<Volume>,
    private readonly contentService: ContentService,
  ) {
    super(volumeRepository);
  }

  async queryContents(query: BaseQuery) {
    const res = await this.query(query);
    const idsSet = new Set<number>();
    res.list.forEach((item) => {
      item.contents.split(',').forEach((contentId) => {
        if (!contentId) return;
        const id = +contentId;
        if (isNaN(id)) return;
        idsSet.add(id);
      });
    });

    const ids = Array.from(idsSet);
    const contents = await this.contentService.findByIds(ids);
    const contentsMap = new Map<number, Content>();
    contents.forEach((item) => {
      contentsMap.set(item.id, item);
    });
    res.list.forEach((item) => {
      const contentIds = item.contents.split(',').map((item) => +item);
      item.contentArray = contentIds.map((id) => contentsMap.get(id));
    });
    return res;
  }
}
