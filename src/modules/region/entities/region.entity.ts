import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'

import { CommonEntity } from '~/common/entity/common.entity'
import { Novel } from '~/modules/novel/entities/novel.entity'
import { Storage } from '~/modules/tools/storage/storage.entity'

@Entity()
export class Region extends CommonEntity {
  @OneToOne(() => Novel, novel => novel.id)
  @JoinColumn({ name: 'novel_id' })
  novel: Novel

  @Column()
  name: string

  @OneToOne(() => Storage, entity => entity.id)
  @JoinColumn({
    name: 'avatar_id',
  })
  avatar: Storage

  @Column({ nullable: true })
  remark: string

  @ManyToOne(() => Region, region => region.children, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Region

  @OneToMany(() => Region, region => region.parent)
  children: Region[]
}
