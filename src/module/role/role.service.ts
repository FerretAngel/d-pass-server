import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { BaseService } from 'src/baseModule/baseService';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Like, Repository } from 'typeorm';
import { BelongService } from '../belong/belong.service';
import { Belong } from '../belong/entities/belong.entity';
import { BaseQuery } from 'src/baseModule/baseQuery';
import { Content } from '../content/entities/content.entity';
import { Info } from '../info/entities/info.entity';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly belongService: BelongService,
    @InjectRepository(Info)
    private readonly infoRepository: Repository<Info>,
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {
    super(roleRepository);
  }

  async queryRelateRole(
    ids: number[],
  ): Promise<Map<number, { infoList: Info[]; contentList: Content[] }>> {
    const query: FindManyOptions<Content | Info> = {
      where: ids.map((id) => ({ roles: Like(`%${id}%`) })),
      order: { createTime: 'DESC' },
      take: 2,
    };
    // 查询资讯
    const infoList = await this.infoRepository.find(query);
    // 查询内容
    const contentList = await this.contentRepository.find({
      ...query,
      take: 5 - infoList.length,
    });
    const res = new Map<number, { infoList: Info[]; contentList: Content[] }>();
    ids.forEach((id) => {
      res.set(id, {
        infoList: infoList.filter((info) => info.roles.includes(id.toString())),
        contentList: contentList.filter((content) =>
          content.roles.includes(id.toString()),
        ),
      });
    });
    return res;
  }

  async queryAndBelong(query: BaseQuery) {
    const res = await this.query(query);
    const idSet = new Set<number>();
    const belongIdSet = new Set<number>();
    res.list.forEach((item) => {
      idSet.add(item.id);
      belongIdSet.add(item.belongId);
    });
    // 查询相关的章节和资讯信息
    const relationMap = await this.queryRelateRole(Array.from(idSet));
    // 查询相关区域信息
    const belongArr = await this.belongService.findByIds(
      Array.from(belongIdSet),
    );
    const belongMap = new Map<number, Belong>();
    belongArr.forEach((belong) => {
      belongMap.set(belong.id, belong);
    });
    res.list.forEach((item) => {
      item.belong = belongMap.get(item.belongId);
      item.relation = relationMap.get(item.id);
    });
    return res;
  }

  /**
   * @description 根据小说id查询角色
   */
  async findByNovelIds(novelIds: number[]) {
    const roles = await this.roleRepository.find({
      where: { novel: In(novelIds) },
    });

    const belongIdSet = new Set<number>();
    roles.forEach((role) => {
      belongIdSet.add(role.belongId);
    });
    const belongArr = await this.belongService.findByIds(
      Array.from(belongIdSet),
    );
    const belongMap = new Map<number, Belong>();
    belongArr.forEach((belong) => {
      belongMap.set(belong.id, belong);
    });
    roles.forEach((role) => {
      role.belong = belongMap.get(role.belongId);
    });
    return roles;
  }

  search(key: string) {
    return this.roleRepository.find({
      where: [
        { name: Like(`%${key}%`) },
        { describe: Like(`%${key}%`) },
        { hobby: Like(`%${key}%`) },
        { ability: Like(`%${key}%`) },
        { occupation: Like(`%${key}%`) },
      ],
    });
  }
}
