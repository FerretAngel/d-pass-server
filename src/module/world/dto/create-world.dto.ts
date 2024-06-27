import { IsNotEmpty } from 'class-validator';

export class CreateWorldDto {
  @IsNotEmpty({ message: '小说ID不能为空：novel' })
  novel: number;
  @IsNotEmpty({ message: '封面不能为空：avatar' })
  cover: string;
}
