import { IsNotEmpty } from 'class-validator';

export class CreateBelongDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  avatar: string;
  @IsNotEmpty()
  novelId: number;
  description?: string;
}
