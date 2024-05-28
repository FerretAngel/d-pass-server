import { Module } from '@nestjs/common';
import { NovelService } from './novel.service';
import { NovelController } from './novel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Novel } from './entities/novel.entity';
import { NovelContent } from './entities/novelContent.entity';
import { UserModule } from '../user/user.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([Novel, NovelContent]),UserModule,EmailModule],
  controllers: [NovelController],
  providers: [NovelService],
})
export class NovelModule {}
