import { BaseEntity } from 'src/baseModule/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'world',
  orderBy: {
    createTime: 'DESC',
  },
})
export class World extends BaseEntity {
  @Column()
  novel: number; // 小说ID
  @Column({ default: null })
  avatar: string;
  @Column()
  title: string;
  @Column()
  remark: string;
  @Column()
  config: string;
}
