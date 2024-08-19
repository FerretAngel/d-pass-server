import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

import { CommonEntity } from '~/common/entity/common.entity'

import { Storage } from '../tools/storage/storage.entity'

@Entity('roles')
export class Role extends CommonEntity {
  @Column()
  @ApiProperty({ description: '小说ID' })
  novelId: number // 小说id

  @Column({ default: '默认角色' })
  @ApiProperty({ description: '角色名称' })
  name: string // 角色名称

  @Column()
  @ApiProperty({ description: '头像ID' })
  @OneToOne(() => Storage)
  @JoinColumn({ name: 'avatarId' })
  avatar: number // 头像

  @Column()
  @OneToOne(() => Storage)
  @JoinColumn({ name: 'drawingId' })
  @ApiProperty({ description: '画像ID' })
  drawing: number // 画像

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

  @Column()
  regionId: number // 所属区域ID

  @Column()
  hobby: string // 爱好

  @Column()
  ability: string // 能力

  @Column()
  occupation: string // 职业
}
