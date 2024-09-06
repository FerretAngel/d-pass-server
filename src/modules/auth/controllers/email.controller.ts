import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { Throttle, ThrottlerGuard } from '@nestjs/throttler'

import { Ip } from '~/common/decorators/http.decorator'

import { MailerService } from '~/shared/mailer/mailer.service'

import { Public } from '../decorators/public.decorator'

import { SendEmailCodeDto } from '../dto/captcha.dto'
import { CaptchaService } from '../services/captcha.service'
import { AuthService } from '../auth.service'
import { UserService } from '~/modules/user/user.service'
import { isEmpty } from 'lodash'
import { BusinessException } from '~/common/exceptions/biz.exception'
import { ErrorEnum } from '~/constants/error-code.constant'

@ApiTags('Auth - 认证模块')
@UseGuards(ThrottlerGuard)
@Controller('auth/email')
export class EmailController {
  constructor(private mailerService: MailerService,private captchaService: CaptchaService,private userService: UserService,) {}

  @Post('send')
  @ApiOperation({ summary: '发送邮箱验证码' })
  @Public()
  @Throttle({ default: { limit: 1, ttl: 60000 } })
  async sendEmailCode(
    @Body() dto: SendEmailCodeDto,
    @Ip() ip: string,
  ): Promise<void> {
    // await this.authService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
    const { email,token } = dto
    await this.captchaService.checkRecapcha(token)
    await this.mailerService.checkLimit(email, ip)
    const { code } = await this.mailerService.sendVerificationCode(email)
    await this.mailerService.log(email, code, ip)
  }
  @Post('sendByLogin')
  @ApiOperation({ summary: '发送登录邮箱验证码' })
  @Public()
  @Throttle({ default: { limit: 1, ttl: 60000 } })
  async sendEmailCodeByLogin(
    @Body() dto: SendEmailCodeDto,
    @Ip() ip: string,
  ): Promise<void> {
    // await this.authService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
    const { email,token } = dto
    await this.captchaService.checkRecapcha(token)
    const user = await this.userService.findUserByUserName(email)
    if (isEmpty(user))
      throw new BusinessException(ErrorEnum.USER_NOT_FOUND)
    await this.mailerService.checkLimit(email, ip)
    const { code } = await this.mailerService.sendVerificationCode(email)
    await this.mailerService.log(email, code, ip)
  }
  @Post('sendByRegister')
  @ApiOperation({ summary: '发送注册邮箱验证码' })
  @Public()
  @Throttle({ default: { limit: 1, ttl: 60000 } })
  async sendEmailCodeByRegister(
    @Body() dto: SendEmailCodeDto,
    @Ip() ip: string,
  ): Promise<void> {
    // await this.authService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
    const { email,token } = dto
    await this.captchaService.checkRecapcha(token)
    const user = await this.userService.findUserByUserName(email)
    if (user)
      throw new BusinessException(ErrorEnum.SYSTEM_USER_EXISTS)
    await this.mailerService.checkLimit(email, ip)
    const { code } = await this.mailerService.sendVerificationCode(email)
    await this.mailerService.log(email, code, ip)
  }

  // @Post()
  // async authWithEmail(@AuthUser() user: IAuthUser) {
  //   // TODO:
  // }
}
