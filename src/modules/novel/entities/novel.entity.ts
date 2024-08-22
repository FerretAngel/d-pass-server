import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, Relation } from 'typeorm'

import { CommonEntity } from '~/common/entity/common.entity'
import { DictItemEntity } from '~/modules/system/dict-item/dict-item.entity'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { UserEntity } from '~/modules/user/user.entity'

@Entity('novel')
export class Novel extends CommonEntity {
  @Column({ default: '默认名称' })
  name: string // 名称

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  author: Relation<UserEntity> // 作者id

  @ManyToOne(() => Storage)
  @JoinColumn({ name: 'cover_id' })
  cover: Relation<Storage> // 封面

  @Column({ default: '' })
  describe: string // 描述

  @ManyToMany(() => DictItemEntity)
  @JoinTable({
    name: 'novel_tag', // 中间表的名称
    joinColumn: { name: 'novel_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Relation<DictItemEntity[]> // 标签
}
