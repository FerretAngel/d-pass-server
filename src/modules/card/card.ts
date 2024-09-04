import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { CommonEntity } from "~/common/entity/common.entity";
import { Storage } from "../tools/storage/storage.entity";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { IdDto } from "~/common/dto/id.dto";

@Entity()
export class Card extends CommonEntity{
  
  @ManyToOne(()=>Storage)
  @JoinColumn({name:'face_id'})
  face:Storage
  @ManyToOne(()=>Storage)
  @JoinColumn({name:'back_id'})
  back:Storage
}

export class CardDto {
  @IsNotEmpty({message:'卡片正面不存在:face'})
  @ValidateNested()
  @Type(()=>IdDto)
  face:Storage
  
  @IsNotEmpty({message:'卡片背面不存在:back'})
  @ValidateNested()
  @Type(()=>IdDto)
  back:Storage
}