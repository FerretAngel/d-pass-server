import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'

import { Novel } from './entities/novel.entity'
import { NovelController } from './novel.controller'
import { NovelService } from './novel.service'
import { DictItemModule } from '../system/dict-item/dict-item.module'
import { UserModule } from '../user/user.module'
import { StorageModule } from '../tools/storage/storage.module'

@Module({
  imports: [TypeOrmModule.forFeature([Novel]),DictItemModule,UserModule,StorageModule],
  controllers: [NovelController],
  providers: [NovelService],
  exports: [TypeOrmModule, NovelService],
})
export class NovelModule {}
