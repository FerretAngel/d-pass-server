import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MenuModule } from '../system/menu/menu.module'
import { ParamConfigModule } from '../system/param-config/param-config.module'

import { RoleModule } from '../system/role/role.module'

import { UserController } from './user.controller'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'
import { DictItemModule } from '../system/dict-item/dict-item.module'
import { Region } from '../region/entities/region.entity'
import { StorageModule } from '../tools/storage/storage.module'
import { CardModule } from '../card/card.module'

const providers = [UserService]

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,Region]),
    RoleModule,
    MenuModule,
    ParamConfigModule,
    DictItemModule,
    StorageModule,
    CardModule
  ],
  controllers: [UserController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class UserModule {}
