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
import { Public } from 'src/guards/access-token.guard';
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileName = await this.fileService.uploadFile(file);
    return {
      url: `http${process.env.SSL === 'true' ? 's' : ''}://${process.env.APP_HOST}${process.env.BASE_URL ? `/${process.env.BASE_URL}` : ''}/file/${fileName}`,
    };
  }

  @Get(':name')
  @Public()
  async getOriginFileByName(@Param('name') name: string, @Response() res: any) {
    const path = await this.fileService.getOriginFileByName(name);
    res.sendFile(path);
  }
}
