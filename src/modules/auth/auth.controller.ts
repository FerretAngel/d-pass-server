import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { Ip } from '~/common/decorators/http.decorator'

import { UserService } from '../user/user.service'

import { AuthService } from './auth.service'
import { Public } from './decorators/public.decorator'
import { LoginDto, LoginWithEmailDto, RegisterDto } from './dto/auth.dto'
import { LocalGuard } from './guards/local.guard'
import { LoginToken } from './models/auth.model'
import { CaptchaService } from './services/captcha.service'
import { BusinessException } from '~/common/exceptions/biz.exception'
import { MailerService } from '~/shared/mailer/mailer.service'

@ApiTags('Auth - 认证模块')
@UseGuards(LocalGuard)
@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private captchaService: CaptchaService,
    private mailerService:MailerService,

  ) { }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiResult({ type: LoginToken })
  async login(@Body() dto: LoginDto, @Ip() ip: string, @Headers('user-agent') ua: string): Promise<LoginToken> {
    // await this.captchaService.checkImgCaptcha(dto.captchaId, dto.verifyCode)
    if(process.env.NODE_ENV === 'production'){
      await this.captchaService.checkRecapcha(dto.token)
    }
    const {token,roles} = await this.authService.login(
      dto.username,
      dto.password,
      ip,
      ua,
    )
    return { token:token.accessToken ,roles}
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() dto: RegisterDto): Promise<void> {
    await this.captchaService.checkRecapcha(dto.token)
    await this.mailerService.checkCode(dto.username,dto.code)
    await this.userService.register(dto)
  }

  @Post('loginWithEmail')
  @ApiOperation({ summary: '邮箱登录' })
  async loginWithEmail(@Body() dto: LoginWithEmailDto, @Ip() ip: string, @Headers('user-agent') ua: string): Promise<LoginToken> {
    await this.captchaService.checkRecapcha(dto.token)
    await this.mailerService.checkCode(dto.email,dto.code)
    const { token, roles } = await this.authService.loginWithEmail(dto.email, ip, ua)
    return { token: token.accessToken, roles }
  }
}
