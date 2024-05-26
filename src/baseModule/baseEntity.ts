import { Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;
  @Column({
    type: 'datetime',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;
  @DeleteDateColumn({ select: false })
  deleteTime: Date;
}
