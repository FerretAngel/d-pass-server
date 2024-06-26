import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_ADMIN_KEY, IS_PUBLIC_KEY } from 'src/guards/access-token.guard';
import { UserService } from '../user/user.service';
import { LogService } from '../log/log.service';
export const REQUEST_USER_KEY = 'user';
export const FINGER_KEY = 'fingerprint';
@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly logService: LogService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;
    const isAdmin = this.reflector.get(IS_ADMIN_KEY, context.getHandler());

    const request = context.switchToHttp().getRequest();
    // 从请求中获取指纹信息
    const fingerprint = this.getFingerPrint(request);
    if (!fingerprint) throw new UnauthorizedException('请先登录');

    // 管理员权限校验
    isAdmin && (await this.userService.checkAdmin(fingerprint));
    
    request[REQUEST_USER_KEY] = { fingerprint };
    return true;
  }
  private getFingerPrint(request: Request): string {
    const { headers, query } = request;
    if (Object.hasOwnProperty.call(headers, FINGER_KEY)) {
      return headers[FINGER_KEY] as string;
    }
    return query[FINGER_KEY] as string;
  }

  /**
   * 从请求头、cookies、query中提取token
   * @param request
   * @returns
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers.authorization ?? '';
    if (authorization.includes(' ')) {
      const [_, token] = authorization.split(' ') ?? [];
      return token;
    } else if (authorization) {
      return authorization;
    }
    const cookie = request.headers.cookie;
    if (cookie) {
      const token = cookie.split(';').find((c) => c.includes('token='));
      if (token) {
        return token.split('=')[1];
      }
    }
    const { token } = request.query;
    if (token) {
      return token as string;
    }
  }
}
