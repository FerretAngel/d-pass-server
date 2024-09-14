import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator'
import { Region } from '../entities/region.entity'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';
import { Storage } from '~/modules/tools/storage/storage.entity';
import { Novel } from '~/modules/novel/entities/novel.entity';
import { IdDto } from '~/common/dto/id.dto';


export class CreateRegionDto {
  @IsNotEmpty({message:'novel不能为空'})
  @ValidateNested()
  @Type(()=>IdDto)
  novel:Novel
  
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @ValidateNested()
  @Type(() => IdDto)
  parent?:Region

  @IsOptional()
  @ValidateNested()
  @Type(() => IdDto)
  avatar?:Storage
  
  @IsOptional()
  @IsString()
  remark?: string
}
