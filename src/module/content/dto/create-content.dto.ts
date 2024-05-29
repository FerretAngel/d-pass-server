import { IsNotEmpty } from "class-validator";

export class CreateContentDto {
  @IsNotEmpty({ message: '小说标题不能为空' })
  title: string;
  @IsNotEmpty({ message: '小说内容不能为空' })
  content: string;
  @IsNotEmpty({ message: '小说id不能为空' })
  novelId: number;
}