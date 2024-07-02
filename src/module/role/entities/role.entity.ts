import { BaseEntity } from 'src/baseModule/baseEntity';
import { Belong } from 'src/module/belong/entities/belong.entity';
import { Content } from 'src/module/content/entities/content.entity';
import { Info } from 'src/module/info/entities/info.entity';
import { Column, Entity } from 'typeorm';
@Entity({
  name: 'roles',
  orderBy: {
    createTime: 'DESC',
  },
})
export class Role extends BaseEntity {
  @Column()
  novel: number; // 小说id
  @Column({ default: '默认角色' })
  name: string; // 角色名称
  @Column()
  avatar: string; // 头像
  @Column()
  drawing: string; // 画像
  @Column()
  age: number; // 年龄
  @Column()
  sex: string; // 性别
  @Column()
  height: number; // 身高
  @Column()
  weight: number; // 体重
  @Column()
  describe: string; // 描述
  @Column()
  belongId: number; // 所属
  belong?: Belong;
  @Column()
  hobby: string; // 爱好
  @Column()
  ability: string; // 能力
  @Column()
  occupation: string; // 职业
  relation?: {
    infoList: Info[];
    contentList: Content[];
  };
}
