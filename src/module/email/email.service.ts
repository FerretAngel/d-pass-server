import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailDto } from './mail.dto';
@Injectable()
export class EmailService {
  lastSendTime = 0;
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail(sendEmailDto: SendMailDto) {
    this.lastSendTime = Date.now();
    return this.mailerService.sendMail({
      ...sendEmailDto,
      subject: sendEmailDto.title,
    });
  }
}
