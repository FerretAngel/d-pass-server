import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { REQUEST_USER_KEY, FINGER_KEY } from '../auth/access-token.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @Post('bindEmail')
  async sendBindEmail(
    @Request() req: any,
    @Body() sendMailDto: { email: string },
  ) {
    const { fingerprint } = (await req[REQUEST_USER_KEY]) ?? {};
    if (!fingerprint) throw new Error('未获取到浏览器指纹');
    const user = await this.userService.findByFinger(fingerprint);
    if (!user) throw new Error('未找到用户');
    return this.userService.bindEmail(user.id, sendMailDto.email);
  }

  @Get('bindEmail')
  async bindEmail(@Param('id') id: string, @Param('email') email: string) {
    await this.userService.bindEmail(+id, email);
    return `<h1>绑定成功:${email}</h1>`;
  }
}
