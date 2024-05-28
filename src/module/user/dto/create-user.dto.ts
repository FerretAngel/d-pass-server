import { IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '浏览器唯一ID不能为空' })
  fingerprint: string;
  name?: string;
  password?: string;
  email?: string;
  avatar?: string;
  describe?: string;
}
