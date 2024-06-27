import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateNovelDto {
  @IsNotEmpty({ message: '小说名称不能为空：name' })
  name: string;
  @IsNotEmpty({ message: '小说简介不能为空：describe' })
  describe: string;
  @IsNotEmpty({ message: '小说封面不能为空：avatar' })
  avatar: string;
  @IsNotEmpty({ message: '小说标签不能为空：tags' })
  tags: string;
}
