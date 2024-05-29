import { IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  name?: string;
  password?: string;
  email?: string;
  avatar?: string;
  describe?: string;
}
