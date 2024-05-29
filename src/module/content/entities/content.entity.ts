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
  @Column()
  author: number; // 作者
  auth?: User; // 作者实体
  @Column({ default: '' })
  title: string; // 标题
  @Column({ type: 'text' })
  content: string; // 内容
  @Column()
  novelId: number; // 小说id
  @Column({ default: false })
  news: boolean; // 是否是新闻
}