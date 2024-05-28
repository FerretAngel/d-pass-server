import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from 'src/baseModule/baseService';
import { User, UserKeys } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { isEmail } from 'class-validator';
import { SendMailDto } from '../email/mail.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {
    super(userRepository);
  }
  /**
   * 更新用户信息
   * @param {number} id {用户id}
   * @param {UpdateUserDto} updateUserDto {更新用户信息}
   * @returns {Promise<User>}
   */
  async updateUserInfo(id: number, updateUserDto: UpdateUserDto) {
    const { name, avatar, describe } = updateUserDto;
    const user = await this.findById(id);
    if (!user) throw new Error('user not found');
    if (name) user.name = name;
    if (avatar) user.avatar = avatar;
    if (describe) user.describe = describe;
    return this.update(id, user);
  }
  checkUserName(name: unknown) {
    if (typeof name !== 'string') throw new Error('用户名不合法');
    if (name.length < 2 || name.length > 20)
      throw new Error('用户名长度在2-20之间');
    return true;
  }
  checkEmail(email: unknown) {
    if (typeof email !== 'string') throw new Error('邮箱不合法');
    if (!isEmail(email)) throw new Error('邮箱格式不正确');
    return true;
  }
  /**
   * 用户注册
   */
  async register(createUserDto: CreateUserDto) {
    const { name, email, fingerprint } = createUserDto;
    // 验证用户昵称
    if (name && this.checkUserName(name)) {
    }
    // 验证邮箱
    if (email && this.checkEmail(email)) {
    }
    const user = await this.userRepository.findOne({
      where: {
        fingerprint: Like(`%${fingerprint}%`),
      },
    });
    if (user) throw new Error('用户已存在');
    return this.userRepository.save({ name, email, fingerprint });
  }

  async findByFinger(fingerprint: string) {
    return this.userRepository.findOne({
      select: UserKeys,
      where: {
        fingerprint: Like(`%${fingerprint}%`),
      },
    });
  }

  async updateUserName(id: number, name: string) {
    this.checkUserName(name);
    return this.updateUserInfo(id, { name });
  }

  async updateUserEmail(id: number, email: string) {
    this.checkEmail(email);
    return this.updateUserInfo(id, { email });
  }

  async getUserBy(str: string) {
    return this.userRepository.findOne({
      select: UserKeys,
      where: [
        { username: str },
        { email: str },
        { phone: str },
        { fingerprint: Like(`%${str}%`) },
      ],
    });
  }
  async confirmEmail(email: string) {
    const { APP_HOST, SSL, BASE_URL } = process.env;
    const url = `http${SSL ? 's' : ''}://${APP_HOST}/${BASE_URL ? BASE_URL + '/' : ''}email/`;
    const sendEmailDto: SendMailDto = {
      to: email,
      title: '邮箱验证',
      from: 'D-PASS',
      text: `
      您正在订阅D-pass推送服务，如果不是您本人操作，请忽略此邮件。
      <a herf="${btoa(encodeURIComponent(url))}">点击验证邮箱</a>
      `,
    };
    this.emailService.sendEmail(sendEmailDto);
  }
  async bindEmail(id: number, email: string) {
    this.checkEmail(email);
    return this.update(id, { email, subscribe: true });
  }
}
