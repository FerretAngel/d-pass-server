import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from 'src/baseModule/baseService';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
  /**
   * 用户
   */
}
