import { BaseEntity } from 'src/baseModule/baseEntity';
import { Content } from 'src/module/content/entities/content.entity';
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
  contentArray?: Array<Content>;
  contentIds?: Array<number>;
}
