import { IsNotEmpty } from 'class-validator';

export class CreateSystemDto {
  @IsNotEmpty({ message: '类型不能为空：type' })
  type: number; // 0:系统设置 1:头像 2:卡面 3:姓氏
  @IsNotEmpty({ message: '内容不能为空：content' })
  content: string;
  @IsNotEmpty({ message: '是否启用不能为空：enabled' })
  enable: boolean; // 是否启用
}
