import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { EmailModule } from './module/email/email.module';
import { NovelModule } from './module/novel/novel.module';
import { UserModule } from './module/user/user.module';
import APPModule from './APP';
import { Exception } from './execption/execption.filter';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './module/auth/access-token.guard';
@Module({
  imports: [
    ...APPModule,
    MulterModule.register(),
    JwtModule.register({}),
    EmailModule,
    AuthModule,
    NovelModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, Exception,{
    provide: APP_GUARD,
    useClass: AccessTokenGuard,
  },],
})
export class AppModule {}
