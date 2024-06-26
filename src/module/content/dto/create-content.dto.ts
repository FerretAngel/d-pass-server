import { IsNotEmpty } from 'class-validator';

export class CreateContentDto {
  @IsNotEmpty({ message: '标题不能为空：title' })
  title: string;
  @IsNotEmpty({ message: '小说不能为空：novel' })
  novel: number;
  @IsNotEmpty({ message: '内容不能为空：content' })
  content: string;
  @IsNotEmpty({ message: '简介不能为空：remark' })
  remark: string;
  @IsNotEmpty({ message: '所属卷不能为空：parent' })
  parent: number;
}
