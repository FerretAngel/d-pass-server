import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { BaseService } from 'src/baseModule/baseService';
import { Content } from './entities/content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Token, marked } from 'marked';
import { VolumeService } from '../volume/volume.service';

@Injectable()
export class ContentService extends BaseService<Content> {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    @Inject(forwardRef(() => VolumeService))
    private readonly volumeService: VolumeService,
  ) {
    super(contentRepository);
  }

  async updateVolume(content: Content, volumeId: number) {
    const volume = await this.volumeService.findById(volumeId);
    if (!volume) throw new Error('卷不存在');
    if (volume.contents?.includes(content.id.toString())) return;
    const contents = volume.contents?.split(',') ?? [];
    contents.push(content.id.toString());
    volume.contents = contents.join(',');
    await this.volumeService.update(volumeId, volume);
  }
  async search(_key: string) {
    const key = `%${_key}%`;
    const query = this.contentRepository
      .createQueryBuilder('content')
      .addSelect('content.content')
      .orWhere('content.title like :key', { key })
      .orWhere('content.content like :key', { key });
    const contentList = await query.getMany();
    const ids = contentList.map((item) => item.id);
    const volumes = await this.volumeService.queryByContentIds(ids);
    contentList.forEach((item) => {
      item['volume'] = volumes.find((volume) =>
        volume.contents.includes(item.id.toString()),
      );
      // 截取关键字附近的内容
      const keyIndex = item.content.indexOf(_key);
      if (keyIndex === -1) return;
      const start = Math.max(0, keyIndex - 50);
      const end = Math.min(item.content.length, keyIndex + 50);
      item.content = `...${item.content.slice(start, end)}...`;
    });
    return contentList;
  }

  findOne(id: number) {
    return this.contentRepository
      .createQueryBuilder('content')
      .addSelect('content.content')
      .where('content.id = :id', { id })
      .getOne();
  }
  parseContent(content: string) {
    const result = marked.lexer(content);
    let lastTitleIndex = result.findIndex(
      (token) => token.type === 'heading' && token.depth === 3,
    );
    const others = result.slice(0, lastTitleIndex);
    const contents = new Array<{ title: string; content: string }>();
    while (lastTitleIndex < result.length) {
      let nextTitleIndex = result
        .slice(lastTitleIndex + 1)
        .findIndex((token) => token.type === 'heading' && token.depth === 3);
      if (nextTitleIndex === -1) {
        nextTitleIndex = result.length;
      }
      nextTitleIndex = nextTitleIndex + lastTitleIndex + 1;
      const content = result
        .slice(lastTitleIndex + 1, nextTitleIndex)
        .map((item) => item.raw);
      // @ts-ignore
      const title = result[lastTitleIndex].tokens
        .filter((item) => ['escape', 'text'].includes(item.type))
        .map((item) => item.text)
        .join('');
      contents.push({
        title,
        content: content.join('').trim(),
      });
      lastTitleIndex = nextTitleIndex;
    }
    contents.sort((a, b) => a.title.localeCompare(b.title));
    return {
      contents,
      others,
    };
  }
}
