import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/baseModule/baseEntity';
@Entity({
  name: 'novel_regin',
  orderBy: {
    createTime: 'DESC',
  },
})
export class Belong extends BaseEntity {
  @Column({ default: '' })
  name: string; // 区域名称
  @Column({ type: 'text' })
  describe: string; // 内容
  @Column()
  novel: number; // 小说id
  @Column()
  avatar: string; // 所属区域徽标
}
