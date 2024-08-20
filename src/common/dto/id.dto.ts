import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class IdDto {
  @ApiProperty({ description: 'ID' })
  @IsNotEmpty({message:'id不能为空'})
  @IsNumber()
  id: number
}
