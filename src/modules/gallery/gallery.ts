import { CommonEntity } from "~/common/entity/common.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, Relation } from "typeorm";
import { Novel } from "../novel/entities/novel.entity";
import { GalleryImage, GalleryImageDto } from "../gallery-image/galleryImage";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsOptional, ValidateNested } from "class-validator";
import { IdDto } from "~/common/dto/id.dto";
import { Storage } from "../tools/storage/storage.entity";

@Entity()
export class Gallery extends CommonEntity{
  @ManyToOne(()=>Novel)
  @JoinColumn({name:'novel_id'})
  novel:Relation<Novel>
  @Column()
  title:string
  @Column({default:''})
  description:string
  @OneToOne(()=>Storage)
  @JoinColumn({name:'cover_id'})
  cover:Relation<Storage>
  @JoinTable({
    name:'gallery_images',
    joinColumn:{
      name:'gallery_id',
      referencedColumnName:'id'
    },
    inverseJoinColumn:{ 
      name:'image_id',
      referencedColumnName:'id'
    }
  })
  @ManyToMany(()=>GalleryImage)
  images:Relation<GalleryImage[]>
}

export class GalleryDto{
  @ValidateNested()
  @Type(()=>IdDto)
  novel:Novel
  @IsNotEmpty({message:'title不能为空'})
  @IsString({message:'title必须为字符串'})
  title:string
  @ValidateNested()
  @Type(()=>IdDto)
  cover:Storage
  @IsOptional()
  @IsString({message:'description必须为字符串'})
  description:string
  @ValidateNested({each:true})
  @Type(()=>IdDto)
  images:GalleryImage[]
}