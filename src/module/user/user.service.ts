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
  async updateUserInfo(id: number, updateUserDto: Partial<User>) {
    const { fingerprint, level, email, phone, username, ...update } =
      updateUserDto;
    const user = await this.findById(id);
    if (!user) throw new Error('user not found');
    Object.assign(user, update);
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
  async register(
    fingerprint: string,
    createUserDto?: CreateUserDto,
  ): Promise<User> {
    const { name, email } = createUserDto ?? {};
    // 验证用户昵称
    name && this.checkUserName(name);
    // 验证邮箱
    email && this.checkEmail(email);
    const user = await this.userRepository.findOne({
      where: {
        fingerprint: Like(`%${fingerprint}%`),
      },
    });
    if (user) throw new Error('用户已存在');
    return this.userRepository.save({ name, email, fingerprint });
  }

  async findByFinger(fingerprint: string): Promise<User> {
    const user = await this.userRepository.findOne({
      select: UserKeys,
      where: {
        fingerprint: Like(`%${fingerprint}%`),
      },
    });
    if (!user) {
      return await this.register(fingerprint);
    }
    return user;
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
  async confirmEmail(fingerprint: string, email: string) {
    const { APP_HOST, SSL, BASE_URL } = process.env;
    this.checkEmail(email);
    const url = `http${SSL === 'true' ? 's' : ''}://${APP_HOST}/${BASE_URL ? BASE_URL + '/' : ''}user/bindEmail?fingerprint=${encodeURIComponent(fingerprint)}&email=${encodeURIComponent(email)}`;
    const sendEmailDto: SendMailDto = {
      to: email,
      title: 'D-PASS邮箱验证',
      text: `
      <h3>您正在订阅D-pass推送服务，如果不是您本人操作，请忽略此邮件。</h3>
      <a herf="${url}">点击验证邮箱</a>
      `,
    };
    this.emailService.sendEmail(sendEmailDto);
  }
  async bindEmail(fingerprint: string, email: string) {
    this.checkEmail(email);
    const user = await this.findByFinger(fingerprint);
    if (!user) throw new Error('用户不存在');
    return this.update(user.id, { email, subscribe: true });
  }
  async addFingerPrintByUid(oldFInger: string, fingerprint: string) {
    const user = await this.findByFinger(oldFInger);
    if (!user) throw new Error('用户不存在');
    const fingers = user.fingerprint.split(',');
    if (fingers.includes(fingerprint)) return; // 已经存在了
    fingers.push(fingerprint);
    if (fingers.length > 5) fingers.shift();
    user.fingerprint = fingers.join(',');
    return this.update(user.id, user);
  }

  async checkAdmin(fingerprint: string) {
    const user = await this.findByFinger(fingerprint);
    if (!user) throw new Error('用户不存在');
    if (user.level !== 2) throw new Error('权限不足，无法操作');
    return true;
  }
}
