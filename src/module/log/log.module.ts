import { Global, Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './log.entity';

@Global()
@Module({
  imports:[TypeOrmModule.forFeature([Log])],
  controllers: [LogController],
  providers: [LogService],
  exports:[LogService]
})
export class LogModule {}
