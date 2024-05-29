import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { BaseService } from 'src/baseModule/baseService';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }

  /**
  * @description 根据小说id查询角色
  */
  async findByNovelIds(novelIds: number[]) {
    return this.roleRepository.find({
      where: { novel: In(novelIds) },
    });
  }
}
