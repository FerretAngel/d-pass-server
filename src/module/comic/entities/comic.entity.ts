import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/baseModule/baseEntity';
@Entity({
  name: 'novel_comic',
  orderBy: {
    createTime: 'DESC',
  },
})
export class Comic extends BaseEntity {
  @Column({ default: 1 })
  author: number; // 作者
  @Column({ default: '' })
  title: string; // 标题
  @Column()
  description: string; // 描述
  @Column({ type: 'text' })
  urls: string; // 内容
  urlArr?: Array<string>;
  @Column()
  novel: number; // 小说id
}
