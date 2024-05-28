import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/baseModule/baseEntity';
@Entity({
  name: 'novel_content',
  orderBy: {
    createTime: 'DESC',
  },
})
export class NovelContent extends BaseEntity {
  @Column()
  author: number; // 作者
  @Column({ default: '' })
  title: string; // 标题
  @Column({ default: '', type: 'text' })
  content: string; // 内容
  @Column()
  novelId: number; // 小说id
  @Column({ default: false })
  news: boolean; // 是否是新闻
}
