import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/baseModule/baseEntity';
@Entity({
  name: 'users',
  orderBy: {
    createTime: 'DESC',
  },
})
export class User extends BaseEntity {
  @Column({ default: '默认用户名' })
  name: string;
  @Column({ default: null })
  avatar: string;
  @Column({ default: false, select: false })
  subscribe: boolean; // 订阅
  @Column({ default: null, select: false })
  phone: string;
  @Column({ default: null, select: false })
  email: string;
  @Column({ default: null, select: false })
  username: string;
  @Column({ default: null, select: false })
  password: string;
  @Column({ default: 0, select: false })
  level: number;
  @Column({ default: null, select: false })
  fingerprint: string; // 浏览器指纹，用于信任设备
  @Column({ default: null })
  describe: string;
}

export const UserKeys = Object.keys(new User()) as Array<keyof User>;
