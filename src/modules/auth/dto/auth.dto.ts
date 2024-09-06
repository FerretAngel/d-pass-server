import { ApiProperty } from '@nestjs/swagger'

import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
  @ApiProperty({ description: '邮箱' })
  @IsString()
  @IsEmail()
  username: string

  @ApiProperty({ description: '密码', example: 'a123456' })
  @IsString()
  @Matches(/^\S*(?=\S{6})(?=\S*\d)(?=\S*[A-Z])\S*$/i)
  @MinLength(6)
  password: string

  @ApiProperty({ description: '验证码标识' })
  @IsString()
  token:string
  // captchaId: string

  // @ApiProperty({ description: '用户输入的验证码' })
  // @IsString()
  // @MinLength(4)
  // @MaxLength(4)
  // verifyCode: string
}

export class RegisterDto {
  @ApiProperty({ description: '账号(邮箱)' })
  @IsEmail()
  @IsString()
  username: string

  @ApiProperty({ description: '密码' })
  @IsString()
  @Matches(/^\S*(?=\S{6})(?=\S*\d)(?=\S*[A-Z])\S*$/i)
  @MinLength(6)
  @MaxLength(16)
  password: string

  @ApiProperty({description:'邮验证码'})
  @IsString()
  @MaxLength(4)
  @MinLength(4)
  code:string
  
  @ApiProperty({ description: '验证码标识' })
  @IsString()
  token:string
}
export class LoginWithEmailDto {
  @ApiProperty({ description: '邮箱' })
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ description: '验证码标识' })
  @IsString()
  token:string

  @ApiProperty({ description: '验证码' })
  @IsString()
  code: string
}