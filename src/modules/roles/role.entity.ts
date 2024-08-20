import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

import { CommonEntity } from '~/common/entity/common.entity'

import { Storage } from '../tools/storage/storage.entity'
import { Region } from '../region/entities/region.entity'
import { Novel } from '../novel/entities/novel.entity'

@Entity('roles')
export class Role extends CommonEntity {
  @OneToOne(()=>Novel)
  @ApiProperty({ description: '小说ID' })
  @JoinColumn({name:'novel_id'})
  novel: Novel // 小说id

  @Column({ default: '默认角色' })
  @ApiProperty({ description: '角色名称' })
  name: string // 角色名称

  @ApiProperty({ description: '头像ID' })
  @OneToOne(() => Storage)
  @JoinColumn({ name: 'avatar_id' })
  avatar: Storage // 头像

  @OneToOne(() => Storage)
  @JoinColumn({ name: 'drawing_id' })
  @ApiProperty({ description: '画像ID' })
  drawing: Storage // 画像

  @Column()
  age: number // 年龄

  @Column()
  sex: string // 性别

  @Column()
  height: number // 身高

  @Column()
  weight: number // 体重

  @Column()
  describe: string // 描述

  @OneToOne(()=>Region)
  @JoinColumn({name:'region_id'})
  region:Region

  @Column()
  hobby: string // 爱好

  @Column()
  ability: string // 能力

  @Column()
  occupation: string // 职业
}
