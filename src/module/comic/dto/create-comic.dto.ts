import { IsNotEmpty } from 'class-validator';

export class CreateComicDto {
  @IsNotEmpty({ message: '作者不能为空：title' })
  title: string; // 标题
  @IsNotEmpty({ message: '描述不能为空：description' })
  description: string; // 描述
  @IsNotEmpty({ message: '链接数组不能为空：urlArr' })
  urlArr: Array<string>;
  @IsNotEmpty({ message: '小说id不能为空：novel' })
  novel: number; // 小说id
}
