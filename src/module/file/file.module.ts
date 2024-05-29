import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ContentModule } from '../content/content.module';
import { NovelModule } from '../novel/novel.module';
@Module({
  imports:[ContentModule,NovelModule],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
