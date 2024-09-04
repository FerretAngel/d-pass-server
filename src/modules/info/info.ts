import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { CommonEntity } from "~/common/entity/common.entity";
import { Novel } from "../novel/entities/novel.entity";
import { Role } from "../roles/role.entity";
import { IsIn, IsNotEmpty, IsString, ValidateIf, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { IdDto } from "~/common/dto/id.dto";
import { Storage } from "../tools/storage/storage.entity";
import { DictItemEntity } from "../system/dict-item/dict-item.entity";

@Entity('info')
export class Info extends CommonEntity{
  @ManyToOne(()=>Novel)
  @JoinColumn({name:'novel_id'})
  novel:Novel
  @Column()
  title:string
  @Column({default:''})
  remark:string
  @Column({select:false,type:'text'})
  content:string

  @ManyToOne(()=>Storage)
  @JoinColumn({name:'cover_id'})
  cover:Storage

  @ManyToMany(()=>Role)
  @JoinTable({
    name:'info_role',
    joinColumn:{
      name:'info_id',
      referencedColumnName:'id'
    },
    inverseJoinColumn:{
      name:'role_id',
      referencedColumnName:'id'
    }
  })
  roles:Role[]


  @ManyToMany(()=>DictItemEntity)
  @JoinTable({
    name:'info_tag',
    joinColumn:{
      name:'info_id',
      referencedColumnName:'id'
    },
    inverseJoinColumn:{
      name:'tag_id',
      referencedColumnName:'id'
    }
  })
  tags:DictItemEntity[]
}


export class InfoDto{

  @IsNotEmpty({ message: '小说不能为空:novel' })
  @ValidateNested()
  @Type(()=>IdDto)
  novel:Novel

  @IsNotEmpty()
  @ValidateNested()
  @Type(()=>IdDto)
  cover:Storage

  @IsNotEmpty()
  @IsString()
  title:string

  @IsNotEmpty()
  @IsString()
  remark?:string

  @IsString()
  content?:string

  @ValidateNested({each:true})
  @Type(()=>IdDto)
  roles:Role[]

  @ValidateNested({each:true})
  @Type(()=>IdDto)
  tags:DictItemEntity[]
}