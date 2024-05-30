import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { BaseService } from 'src/baseModule/baseService';
import { Content } from './entities/content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token, marked } from 'marked';

@Injectable()
export class ContentService extends BaseService<Content> {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {
    super(contentRepository);
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
