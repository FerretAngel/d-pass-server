import { BaseEntity } from 'src/baseModule/baseEntity';
import { Column, Entity } from 'typeorm';
@Entity({
  name: 'volumes',
  orderBy: {
    createTime: 'DESC',
  },
})
export class Volume extends BaseEntity {
  @Column({ default: 1 })
  novel: number;
  @Column()
  name: string;
  @Column()
  contents: string;
  contentIds?: Array<number>;
}
