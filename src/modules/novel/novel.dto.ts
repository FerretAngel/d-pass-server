import { ApiProperty} from '@nestjs/swagger'
import { IsArray, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator'

import { Type } from 'class-transformer';
import { Storage } from '../tools/storage/storage.entity';
import { DictItemEntity } from '../system/dict-item/dict-item.entity';
import { IdDto } from '~/common/dto/id.dto';

export class NovelDto {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty({ message: '名称不可为空：name' })
  @IsString()
  name: string

  @ApiProperty({ description: '封面' })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => IdDto)
  cover: Storage;

  @ApiProperty({ description: 'tags' })
  @IsArray()
  @ValidateNested({each:true})
  @Type(() => IdDto)
  tags: DictItemEntity[]
}
