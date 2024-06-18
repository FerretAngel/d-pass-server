import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/baseModule/baseEntity';
import { User } from 'src/module/user/entities/user.entity';
@Entity({
  name: 'novel_content',
  orderBy: {
    createTime: 'DESC',
  },
})
export class Content extends BaseEntity {
  @Column({ default: 1 })
  author: number; // 作者
  @Column({ default: '' })
  title: string; // 标题
  @Column({ type: 'text', select: false })
  content: string; // 内容
  @Column({ default: '' })
  remark: string; // 简介
  @Column()
  novel: number; // 小说id
  @Column({ default: false })
  news: boolean; // 是否是新闻
  @Column({ default: null })
  avatar: string; // 封面
}
