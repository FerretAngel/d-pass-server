import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/baseModule/baseEntity';
import { User } from 'src/module/user/entities/user.entity';
import { Role } from 'src/module/role/entities/role.entity';

export class Novel extends BaseEntity {
  @Column({ default: '默认名称' })
  name: string; // 名称
  @Column()
  author: number; // 作者id
  @Column({ nullable: true })
  avatar?: string; // 封面
  @Column({ nullable: true })
  cover?: string; // 背景大图
  @Column({ nullable: true })
  describe?: string; // 描述
  @Column()
  tags: string; // 标签
  auth?: User; // 作者实体
  roles?: Role[]; // 角色实体
}
