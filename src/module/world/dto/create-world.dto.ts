import { IsNotEmpty } from 'class-validator';

export class CreateWorldDto {
  @IsNotEmpty({ message: '小说ID不能为空：novel' })
  novel: number;
  @IsNotEmpty({ message: '封面不能为空：avatar' })
  avatar: string;
  @IsNotEmpty({ message: '标题不能为空：title' })
  title: string;
  @IsNotEmpty({ message: '简介不能为空：remark' })
  remark: string;
  @IsNotEmpty({ message: '配置不能为空：config' })
  config: string;
}
