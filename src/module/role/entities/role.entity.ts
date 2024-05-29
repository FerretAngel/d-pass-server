import { BaseEntity } from 'src/baseModule/baseEntity';
import { Column, Entity } from 'typeorm';
@Entity({
  name: 'roles',
  orderBy: {
    createTime: 'DESC',
  },
})
export class Role extends BaseEntity {
  @Column({ default: null })
  novel: number; // 小说id
  @Column({ default: '默认角色' })
  name: string; // 角色名称
  @Column({ default: null })
  avatar: string; // 头像
  @Column({ default: null })
  drawing: string; // 画像
  @Column({ default: null })
  age: number; // 年龄
  @Column({ default: null })
  sex: string; // 性别
  @Column({ default: null })
  height: number; // 身高
  @Column({ default: null })
  weight: number; // 体重
  @Column({ default: null })
  describe: string; // 描述
  @Column({ default: null })
  belong: string; // 所属
  @Column({ default: null })
  hobby: string; // 爱好
  @Column({ default: null })
  ability: string; // 能力
  @Column({ default: null })
  occupation: string; // 职业
}
