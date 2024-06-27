import { IsNotEmpty } from 'class-validator';

export class CreateComicDto {
  @IsNotEmpty({ message: '标题不能为空：title' })
  title: string; // 标题
  @IsNotEmpty({ message: '描述不能为空：description' })
  description: string; // 描述
  @IsNotEmpty({ message: '内容图片不能为空：urls' })
  urls: string;
  @IsNotEmpty({ message: '小说id不能为空：novel' })
  novel: number; // 小说id
}
