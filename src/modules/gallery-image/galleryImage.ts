import { CommonEntity } from "~/common/entity/common.entity";
import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { Storage } from "../tools/storage/storage.entity";
import { IsBoolean, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { IdDto } from "~/common/dto/id.dto";
import { Novel } from "../novel/entities/novel.entity";

@Entity()
export class GalleryImage extends CommonEntity{
  @ManyToOne(()=>Novel)
  @JoinColumn({name:'novel_id'})
  novel:Relation<Novel>
  @ManyToOne(()=>Storage)
  @JoinColumn({name:'image_id'})
  image:Relation<Storage>
  @Column({default:0})
  sort:number
  @Column({default:false})
  top:boolean
}

export class GalleryImageDto{
  @ValidateNested()
  @Type(()=>IdDto)
  image:Storage
  @IsOptional()
  @IsNumber()
  sort:number
  @IsOptional()
  @IsBoolean()
  top:boolean
}

