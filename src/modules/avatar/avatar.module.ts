import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import { Avatar } from './avatar.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from '../tools/storage/storage.module';

@Module({
  imports:[TypeOrmModule.forFeature([Avatar]),StorageModule],
  controllers: [AvatarController],
  providers: [AvatarService],
  exports:[AvatarService]
})
export class AvatarModule {}
