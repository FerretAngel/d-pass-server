import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { EmailService } from 'src/module/email/email.service';
import { LogService } from 'src/module/log/log.service';
import { EntityPropertyNotFoundError, QueryFailedError } from 'typeorm';

type ExecptionType =
  | HttpException
  | BadRequestException
  | UnauthorizedException
  | NotFoundException;

function getStatusAndMessage(exception: ExecptionType) {
  // 判断exception上是否有getResponse（）
  // if (
  //   !(
  //     exception.hasOwnProperty('getResponse') &&
  //     typeof exception.getResponse === 'function'
  //   )
  // ) {
  //   console.log(exception);
  //   return {
  //     code: 500,
  //     message: '服务器错误',
  //   };
  // }
  const { message = '' } = (
    exception.hasOwnProperty('getResponse') &&
    typeof exception.getResponse === 'function'
      ? exception.getResponse()
      : { message: exception?.message }
  ) as any;
  switch (exception.constructor) {
    case UnauthorizedException:
      let msg = message;
      if (msg === 'jwt expired') msg = 'token已过期,请重新登录！';
      else if (msg === 'invalid token') msg = 'token无效，请重新登录！';
      else if (msg === 'Unauthorized') msg = '未登录，请重新登录！';
      return {
        code: 401,
        message: msg,
      };
    case BadRequestException:
      return {
        code: 400,
        message: exception.getResponse()['message'][0] ?? exception.message,
      };
    case HttpException:
      return {
        code: exception.getStatus(),
        message: exception.message,
      };
    case NotFoundException:
      return {
        code: 404,
        message: exception?.message ?? '接口不存在',
      };

    case Error:
      return {
        code: 400,
        message: message,
      };
    case QueryFailedError:
      console.error('数据库查询错误', exception);
      return {
        code: 500,
        message: '数据库查询错误:' + JSON.stringify(exception, null, 2),
      };
    case EntityPropertyNotFoundError:
      console.log('数据库字段错误', exception);
      return {
        code: 400,
        message: '数据库字段错误:' + JSON.stringify(exception, null, 2),
      };
    default:
      console.error('未处理的错误', exception);
      return {
        code: 500,
        message: '服务器错误:' + JSON.stringify(exception, null, 2),
      };
  }
}

@Catch()
export class Exception implements ExceptionFilter {
  constructor(private readonly logService: LogService) {}
  catch(exception: ExecptionType, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { code, message } = getStatusAndMessage(exception);
    response.status(200).json({
      code,
      message,
    });
    this.logService.error(message);
  }
}
