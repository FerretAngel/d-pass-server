import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { Info } from './info';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovelModule } from '../novel/novel.module';
import { DictItemModule } from '../system/dict-item/dict-item.module';
import { RolesModule } from '../roles/roles.module';
import { StorageModule } from '../tools/storage/storage.module';

@Module({
  imports:[TypeOrmModule.forFeature([Info]),NovelModule,RolesModule,DictItemModule,StorageModule],
  controllers: [InfoController],
  providers: [InfoService],
  exports:[InfoService]
})
export class InfoModule {}
