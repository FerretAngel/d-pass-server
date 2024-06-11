import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { BaseService } from 'src/baseModule/baseService';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BelongService } from '../belong/belong.service';
import { Belong } from '../belong/entities/belong.entity';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly belongService: BelongService,
  ) {
    super(roleRepository);
  }

  /**
   * @description 根据小说id查询角色
   */
  async findByNovelIds(novelIds: number[]) {
    // 根据小说id查询角色
    const roles = await this.roleRepository.find({
      where: { novel: In(novelIds) },
    });
    // 获取所属区域id,并去重
    const belongIdSet = new Set<number>();
    roles.forEach((role) => {
      belongIdSet.add(role.belongId);
    });
    const belongIds = Array.from(belongIdSet);
    // 根据所属区域id查询所属区域
    const belongs = await this.belongService.findByIds(belongIds);
    // 将所属区域转换为map
    const belongMap = new Map<number, Belong>();
    belongs.forEach((belong) => {
      belongMap.set(belong.id, belong);
    });
    // 将所属区域赋值给角色
    roles.forEach((role) => {
      role.belong = belongMap.get(role.belongId);
    });
    return roles;
  }
}
