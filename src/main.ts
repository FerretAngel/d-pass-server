import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Exception } from './execption/execption.filter';
import { TransformInterceptor } from './transform/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.BASE_URL);
  // 错误处理
  const exceptionFilter = app.get<Exception>(Exception);
  app.useGlobalFilters(exceptionFilter);
  // 统一返回值
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT);
  console.log(`running: http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
}
bootstrap();
