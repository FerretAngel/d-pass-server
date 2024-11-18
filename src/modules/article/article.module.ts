import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article';
import { NovelModule } from '../novel/novel.module';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([Article]),NovelModule,RolesModule,AuthModule],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports:[ArticleService]
})
export class ArticleModule {}
