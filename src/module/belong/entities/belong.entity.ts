import { BaseEntity } from 'src/baseModule/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'role_belong',
  orderBy: {
    createTime: 'DESC',
  },
})
export class Belong extends BaseEntity {
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  avatar: string;
  @Column()
  novelId: number;
}
