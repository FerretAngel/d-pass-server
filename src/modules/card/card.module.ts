import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card';
import { StorageModule } from '../tools/storage/storage.module';

@Module({
  imports:[TypeOrmModule.forFeature([Card]),StorageModule],
  controllers: [CardController],
  providers: [CardService],
  exports:[CardService],
})
export class CardModule {}
