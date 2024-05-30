import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/baseModule/baseEntity';
@Entity({
  name: 'logs',
  orderBy: {
    createTime: 'DESC',
  },
})
export class Log extends BaseEntity {
  @Column({ default: 1 })
  type: 0|1; // 类型 0:错误 1:信息
  @Column({ default: '' })
  message: string; // 消息
}
