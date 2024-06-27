import { Module, forwardRef } from '@nestjs/common';
import { VolumeService } from './volume.service';
import { VolumeController } from './volume.controller';
import { ContentModule } from '../content/content.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../content/entities/content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content]),forwardRef(() => ContentModule)],
  controllers: [VolumeController],
  providers: [VolumeService],
  exports: [VolumeService],
})
export class VolumeModule {}
