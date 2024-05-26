import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/baseModule/baseEntity';
@Entity()
export class User extends BaseEntity {
  @Column({ default: '默认用户名' })
  name: string;
  @Column({ default: '' })
  avatar: string;
  @Column({ default: '', select: false })
  phone: string;
  @Column({ default: '', select: false })
  email: string;
  @Column({ default: '', select: false })
  username: string;
  @Column({ default: '', select: false })
  password: string;
  @Column({ default: 0, select: false })
  level: number;
  @Column({ default: '', select: false })
  fingerprint: string; // 浏览器指纹，用于信任设备
  @Column({ default: '' })
  describe?: string;
}
