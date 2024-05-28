import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class SendMailDto {
  @IsNotEmpty({ message: '收件人邮箱不能为空' })
  @IsEmail({}, { message: '收件人邮箱格式不正确' })
  to: string;
  @IsNotEmpty({ message: '邮件标题不能为空' })
  title: string;
  @IsNotEmpty({ message: '邮件内容不能为空' })
  text: string;
  html?: string;
  @IsOptional()
  @IsEmail(undefined, { message: '发件人邮箱格式不正确,示例:XXX<xxx@qq.com>' })
  from?: string;
}
