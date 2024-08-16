import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/baseModule/baseEntity';
import { System } from 'src/module/system/entities/system.entity';
@Entity({
  name: 'users',
  orderBy: {
    createTime: 'DESC',
  },
})
export class User extends BaseEntity {
  @Column({ default: '欧阳冬冬' })
  name: string;
  @Column({ nullable: true })
  avatar?: string;
  @Column({ default: false, select: false })
  subscribe: boolean; // 订阅
  @Column({ select: false, nullable: true })
  phone?: string;
  @Column({ select: false, nullable: true })
  email?: string;
  @Column({ select: false, nullable: true })
  username?: string;
  @Column({ select: false, nullable: true })
  password?: string;
  @Column({ select: false, default: 0 })
  level: number;
  @Column({ select: false, nullable: true })
  fingerprint?: string; // 浏览器指纹，用于信任设备
  @Column({ nullable: true })
  describe?: string;
  @Column({ default: '' })
  currentCard: string;
  @Column({ default: '' })
  cardList: string;
  cards:System[];
  @Column({ default: '' })
  ability: string; // 能力
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  brithday: Date;
  @Column({ default: '男' })
  sex: string;
  @Column({ default: '北屿辖区' })
  region: string;
}

export const UserKeys: Array<keyof User> = [
  'id',
  'name',
  'username',
  'email',
  'phone',
  'fingerprint',
  'level',
  'subscribe',
  'avatar',
  'describe',
  'ability',
  'brithday',
  'region',
  'sex',
  'currentCard',
  'cardList',
];
