import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator'
import { Region } from '../entities/region.entity'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';
import { Storage } from '~/modules/tools/storage/storage.entity';

class EntityIdDto{
  @ApiProperty({ description: 'ID' })
  @IsNotEmpty()
  @IsInt()
  id: number;
}

export class CreateRegionDto {
  // @IsNotEmpty()
  // @IsNumber()
  // novel_id: number

  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @ValidateNested()
  @Type(() => EntityIdDto)
  parent?:Region

  @IsOptional()
  @ValidateNested()
  @Type(() => EntityIdDto)
  avatar?:Storage
  
  @IsOptional()
  @IsString()
  remark?: string
}
