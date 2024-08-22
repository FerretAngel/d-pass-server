import { Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, Relation } from "typeorm";
import { CommonEntity } from "~/common/entity/common.entity";
import { Novel } from "../novel/entities/novel.entity";
import { Storage } from "../tools/storage/storage.entity";
import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { IdDto } from "~/common/dto/id.dto";
import { Optional } from "@nestjs/common";

@Entity()
export class World extends CommonEntity{
  @ManyToOne(()=>Novel)
  @JoinColumn({name:'novel_id'})
  novel:Relation<Novel>
  @ManyToMany(()=>Storage)
  @JoinTable({
    name:'world_cover',
    joinColumn:{name:'world_id',referencedColumnName:'id'},
    inverseJoinColumn:{name:'cover_id',referencedColumnName:'id'}
  })
  covers:Relation<Storage[]>
}

export class WorldDto{
  @IsNotEmpty({message:'novel不能为空'})
  @ValidateNested()
  @Type(()=>IdDto)
  novel:Novel

  @Optional()
  @ValidateNested({each:true})
  @IsArray()
  @Type(()=>IdDto)
  covers:Storage[]
}