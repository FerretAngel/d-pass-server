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
  @Column()
  cover: string; // 封面
}
