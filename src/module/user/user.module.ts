import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity';
import { EmailModule } from '../email/email.module';
import { SystemModule } from '../system/system.module';
@Module({
  imports:[TypeOrmModule.forFeature([User]),EmailModule,SystemModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
