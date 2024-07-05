import { BaseEntity } from 'src/baseModule/baseEntity';
import { Column, Entity } from 'typeorm';
export enum SystemType {
  SYSTEM = 0,
  AVATAR = 1,
  CARD = 2,
  SURNAME = 3,
}
@Entity({
  name: 'system',
  orderBy: {
    createTime: 'DESC',
  },
})
export class System extends BaseEntity {
  @Column()
  type: SystemType; // 0:系统设置 1:头像 2:卡面 3:姓氏
  @Column({ default: '' })
  content: string;
  @Column({ default: true })
  enable: boolean; // 是否启用
  @Column({ default: false })
  default: boolean; // 是否默认
}
