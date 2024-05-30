import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { REQUEST_USER_KEY, FINGER_KEY } from '../auth/access-token.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Request() req: any, @Body() createUserDto: CreateUserDto) {
    const { fingerprint } = (await req[REQUEST_USER_KEY]) ?? {};
    if (!fingerprint) throw new Error('未获取到浏览器指纹');
    return this.userService.register(fingerprint, createUserDto);
  }

  @Patch()
  async update(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    const { fingerprint } = (await req[REQUEST_USER_KEY]) ?? {};
    if (!fingerprint) throw new Error('未获取到浏览器指纹');
    const user = await this.userService.findByFinger(fingerprint);
    return this.userService.updateUserInfo(user.id, updateUserDto);
  }
  @Post('bindEmail')
  async sendBindEmail(
    @Request() req: any,
    @Body() sendMailDto: { email: string },
  ) {
    const { fingerprint } = (await req[REQUEST_USER_KEY]) ?? {};
    if (!fingerprint) throw new Error('未获取到浏览器指纹');
    return this.userService.confirmEmail(fingerprint, sendMailDto.email);
  }

  @Get('bindEmail')
  async bindEmail(@Request() req: any, @Query('email') email: string) {
    let { fingerprint } = (await req[REQUEST_USER_KEY]) ?? {};
    if (!fingerprint) throw new Error('未获取到浏览器指纹');
    fingerprint = decodeURIComponent(fingerprint);
    email = decodeURIComponent(email);
    await this.userService.bindEmail(fingerprint, email);
    return `绑定成功:${email}`;
  }

  @Post('addFinger')
  async addFinger(@Request() req: any, @Body() body: { fingerprint: string }) {
    const { fingerprint } = (await req[REQUEST_USER_KEY]) ?? {};
    if (!fingerprint) throw new Error('未获取到浏览器指纹');
    const { fingerprint: finger } = body;
    if (!finger) throw new Error('未获取到浏览器指纹:fingerprint');
    return this.userService.addFingerPrintByUid(fingerprint, finger);
  }
}
