import { IsNotEmpty } from 'class-validator';

export class CreateRegionDto {
  @IsNotEmpty({ message: '区域名称不能为空：name' })
  name: string; // 区域名称
  @IsNotEmpty({ message: '小说id不能为空：novel' })
  novel: number; // 小说id
}
