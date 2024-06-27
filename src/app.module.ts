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
import { ContentModule } from './module/content/content.module';
import { RoleModule } from './module/role/role.module';
import { FileModule } from './module/file/file.module';
import { VolumeModule } from './module/volume/volume.module';
import { LogModule } from './module/log/log.module';
import { BelongModule } from './module/belong/belong.module';
import { ComicModule } from './module/comic/comic.module';
import { WorldModule } from './module/world/world.module';
import { InfoModule } from './module/info/info.module';
@Module({
  imports: [
    ...APPModule,
    MulterModule.register(),
    JwtModule.register({}),
    LogModule,
    EmailModule,
    AuthModule,
    NovelModule,
    UserModule,
    VolumeModule,
    ContentModule,
    RoleModule,
    FileModule,
    BelongModule,
    ComicModule,
    WorldModule,
    InfoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Exception,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
