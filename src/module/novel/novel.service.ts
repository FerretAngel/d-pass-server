import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/baseModule/baseService';
import { Novel } from './entities/novel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { BaseQuery } from 'src/baseModule/baseQuery';
import { CreateNovelDto } from './dto/create-novel.dto';
import { UpdateNovelDto } from './dto/update-novel.dto';
import { RoleService } from '../role/role.service';
import { Role } from '../role/entities/role.entity';
import { Token, marked } from 'marked';
@Injectable()
export class NovelService extends BaseService<Novel> {
  constructor(
    @InjectRepository(Novel)
    private readonly novelRepository: Repository<Novel>,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {
    super(novelRepository);
  }
  /**
   * @description 添加小说
   */
  async addNovel(fingerprint: string, createNovelDto: CreateNovelDto) {
    const { name } = createNovelDto;
    const user = await this.userService.findByFinger(fingerprint);
    if (!user) throw new Error('未找到用户');
    const novel = await this.novelRepository.findOne({ where: { name } });
    console.log(novel);

    if (novel) throw new Error('小说名称已存在:' + name);
    return this.create({
      ...createNovelDto,
      author: user.id,
      tags: createNovelDto.tags.join(','), // 将标签数组转为字符串
    });
  }
  /**
   * @description 更新小说
   */
  updateNovel(id: number, updateNovelDto: UpdateNovelDto) {
    return this.update(id, {
      ...updateNovelDto,
      tags: updateNovelDto.tags.join(','), // 将标签数组转为字符串
    }).then(() => '更新成功');
  }
  /**
   * @description 删除小说
   */
  deleteNovel(id: number) {
    return this.remove(id);
  }
  /**
   * @description 查询小说
   */
  async queryNovel(query: BaseQuery) {
    const res = await this.query(query);
    let uidSet = new Set<number>();
    let novelIdSet = new Set<number>();
    res.list.forEach((item) => {
      const { author, id } = item;
      uidSet.add(author);
      novelIdSet.add(id);
    });
    const uids = Array.from(uidSet);
    const novelIds = Array.from(novelIdSet);
    // 获取小说作者
    const users = await this.userService.findByIds(uids);
    const userMap = new Map(users.map((item) => [item.id, item]));
    // 获取小说角色
    const roles = await this.roleService.findByNovelIds(novelIds);
    const roleMap = new Map<number, Role[]>();
    roles.forEach((item) => {
      const { novel } = item;
      if (!roleMap.has(novel)) {
        roleMap.set(novel, [item]);
        return;
      }
      roleMap.get(novel).push(item);
    });
    // 将作者和角色信息添加到小说中
    res.list.forEach((item) => {
      const { author, id } = item;
      item.auth = userMap.get(author);
      item.roles = roleMap.get(id);
    });
    return res;
  }
  findByName(name: string) {
    return this.novelRepository.findOne({ where: { name } });
  }

  
}
