import { IsNotEmpty } from 'class-validator';

export class CreateContentDto {
  @IsNotEmpty({ message: '小说标题不能为空：title' })
  title: string;
  @IsNotEmpty({ message: '小说内容不能为空：content' })
  content: string;
  @IsNotEmpty({ message: '小说id不能为空' })
  novel: number;
  @IsNotEmpty({ message: '小说简介不能为空：remark' })
  remark: string;
  news?: boolean;
  avatar?: string;
}
