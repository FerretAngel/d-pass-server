import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Admin, Public } from 'src/guards/access-token.guard';
import * as mammoth from 'mammoth';
import { marked, type Token } from 'marked';
import { ContentService } from '../content/content.service';
import { NovelService } from '../novel/novel.service';
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly contentService: ContentService,
    private readonly novelService: NovelService,
  ) {}

  @Post()
  @Admin()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileName = await this.fileService.uploadFile(file);
    return {
      url: `http${process.env.SSL === 'true' ? 's' : ''}://${process.env.APP_HOST}${process.env.BASE_URL ? `/${process.env.BASE_URL}` : ''}/file/${fileName}`,
    };
  }

  @Post('extract')
  @Admin()
  @UseInterceptors(FileInterceptor('file'))
  async extractFile(@UploadedFile() file: Express.Multer.File) {
    const { buffer } = file;
    const { value } = await mammoth.convertToMarkdown({ buffer });
    const { contents, others } = this.contentService.parseContent(value);
    // @ts-ignore
    const novelName = others[0].tokens
      .filter((item) => ['escape', 'text'].includes(item.type))
      .map((item) => item.text)
      .join('');
    if (!novelName) throw new Error('未找到小说名称');
    const novel = await this.novelService.findByName(novelName);
    if (!novel) throw new Error('未找到小说:' + novelName);
    for await (const content of contents) {
      await this.contentService.create({
        title: content.title,
        content: content.content,
        novel: novel.id,
      });
    }
    return `导入${novelName}共计${contents.length}章节: ${contents.map((item) => item.title).join(' ')}`;
  }

  @Get(':name')
  @Public()
  async getOriginFileByName(@Param('name') name: string, @Response() res: any) {
    const path = await this.fileService.getOriginFileByName(name);
    res.sendFile(path);
  }
}
