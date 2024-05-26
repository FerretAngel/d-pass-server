import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { EmailModule } from './module/email/email.module';
import { NovelModule } from './module/novel/novel.module';
import { UserModule } from './module/user/user.module';
import APPConfig from './APP';
@Module({
  imports: [
    ...APPConfig,
    AuthModule,
    EmailModule,
    NovelModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
