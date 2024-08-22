import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, Relation } from "typeorm";
import { CommonEntity } from "~/common/entity/common.entity";
import { Novel } from "../novel/entities/novel.entity";
import { UserEntity } from "../user/user.entity";
import { Storage } from "../tools/storage/storage.entity";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { IdDto } from "~/common/dto/id.dto";

@Entity()
export class Comic extends CommonEntity{
  @ManyToOne(()=>Novel)
  @JoinColumn({name:'novel_id'})
  novel:Relation<Novel>
  @Column()
  title:string
  @Column()
  description:string
  @ManyToMany(()=>Storage)
  @JoinTable({
    name:'comic_image',
    joinColumn:{
      name:'comic_id',
      referencedColumnName:'id',
    },
    inverseJoinColumn:{
      name:'image_id',
      referencedColumnName:'id',
    }
  })
  images:Relation<Storage[]>
}

export class ComicDto{
  @IsNotEmpty({message:'novel不能为空'})
  @ValidateNested()
  @Type(()=>IdDto)
  novel:Novel
  @IsNotEmpty({message:'title不能为空'})
  @IsString()
  title:string
  @IsNotEmpty({message:'description不能为空'})
  @IsString()
  description:string
  @IsNotEmpty({message:'images不能为空'})
  @ValidateNested({each:true})
  @Type(()=>IdDto)
  images:Storage[]
}