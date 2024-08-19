import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger'
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator'

import { PagerDto } from '~/common/dto/pager.dto'

export class NovelDto {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty({ message: '名称不可为空：name' })
  @IsString()
  name: string

  @ApiProperty({ description: '封面ID' })
  @IsNotEmpty()
  @IsInt()
  cover_id: number

  @ApiProperty({ description: 'tags' })
  @IsArray()
  @IsNotEmpty()
  @IsInt({ each: true })
  tags: number[]
}

export class NovelUpdateDto extends PartialType(NovelDto) {}

export class NovelQueryDto extends IntersectionType(PagerDto, NovelDto) {}
