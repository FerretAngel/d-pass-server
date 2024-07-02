import { BaseEntity } from 'src/baseModule/baseEntity';
import { Column, Entity } from 'typeorm';
@Entity({
  name: 'novel_info',
  orderBy: {
    createTime: 'DESC',
  },
})
export class Info extends BaseEntity {
  @Column({ default: 1 })
  author: number; // 作者
  @Column()
  novel: number; // 小说id
  @Column()
  title: string; // 标题
  @Column({ type: 'text', select: false, default: null })
  content: string; // 内容
  @Column({ default: '' })
  remark: string; // 简介
  @Column({ default: '' })
  cover: string; // 封面
  @Column()
  type: number; // 类型
  @Column({ default: '' })
  roles: string; // 相关角色id
}
