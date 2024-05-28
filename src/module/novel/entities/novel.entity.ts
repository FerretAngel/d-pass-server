import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/baseModule/baseEntity';
@Entity({
  name: 'novel',
  orderBy: {
    createTime: 'DESC',
  },
})
export class Novel extends BaseEntity {
  @Column({ default: '默认名称' })
  name: string; // 名称
  @Column()
  author: number; // 作者id
  @Column({ default: null })
  avatar: string; // 封面
  @Column({ default: null })
  describe: string; // 描述
}
