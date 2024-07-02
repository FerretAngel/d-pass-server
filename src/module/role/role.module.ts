import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { BelongModule } from '../belong/belong.module';
import { ContentModule } from '../content/content.module';
import { InfoModule } from '../info/info.module';
import { Content } from '../content/entities/content.entity';
import { Info } from '../info/entities/info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Content, Info]), BelongModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
