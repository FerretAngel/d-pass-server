import { IsNotEmpty } from 'class-validator';

export class CreateBelongDto {
  @IsNotEmpty({ message: '区域名称不能为空：name' })
  name: string; // 区域名称
  @IsNotEmpty({ message: '内容不能为空：describe' })
  describe: string; // 内容
  @IsNotEmpty({ message: '小说id不能为空：novel' })
  novel: number; // 小说id
  @IsNotEmpty({ message: '所属区域徽标不能为空：avatar' })
  avatar: string; // 所属区域徽标
}
