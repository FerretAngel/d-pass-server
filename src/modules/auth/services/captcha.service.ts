import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'

import Redis from 'ioredis'
import { isEmpty } from 'lodash'

import { BusinessException } from '~/common/exceptions/biz.exception'
import { ErrorEnum } from '~/constants/error-code.constant'
import { genCaptchaImgKey } from '~/helper/genRedisKey'
import { CaptchaLogService } from '~/modules/system/log/services/captcha-log.service'

@Injectable()
export class CaptchaService {
  constructor(
    @InjectRedis() private redis: Redis,

    private captchaLogService: CaptchaLogService,
  ) {}

  /**
   * 校验图片验证码
   */
  async checkImgCaptcha(id: string, code: string): Promise<void> {
    const result = await this.redis.get(genCaptchaImgKey(id))
    if (isEmpty(result) || code.toLowerCase() !== result.toLowerCase())
      throw new BusinessException(ErrorEnum.INVALID_VERIFICATION_CODE)

    // 校验成功后移除验证码
    await this.redis.del(genCaptchaImgKey(id))
  }

  async log(
    account: string,
    code: string,
    provider: 'sms' | 'email',
    uid?: number,
  ): Promise<void> {
    await this.captchaLogService.create(account, code, provider, uid)
  }
  async check(code: string) {
    const CAPTCHA_KEY = '6LdBwmYpAAAAAF1juIKnLQ7kuTRegcMyz2DhE10o';
    const url = `https://recaptcha.net/recaptcha/api/siteverify`;
    const data = {
      secret: CAPTCHA_KEY,
      response: code,
    };
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data),
    });
    const json = (await res.json()) as {
      success: boolean;
      challenge_ts: string;
      hostname: string;
      score: number;
      action: 'submit';
      'error-codes'?: string[];
    };
    return json;
  }

  async checkRecapcha(token:string){
    try {
      const { success, 'error-codes': errorCodes } = await this.check(token);
      if (!success) throw new BusinessException(`1002:人机验证失败:${errorCodes.join(',')}`);
    } catch (error) {
      throw new BusinessException('1002:人机验证失败：网络错误')
    }
  }
}