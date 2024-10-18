import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { CommonEntity } from "~/common/entity/common.entity";
import { Storage } from "../tools/storage/storage.entity";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { IdDto } from "~/common/dto/id.dto";

@Entity()
export class Avatar extends CommonEntity{
  @ManyToOne(()=>Storage)
  @JoinColumn({name:'avatar_id'})
  avatar:Storage
}

export class AvatarDto {
  @IsNotEmpty({message:'头像不存在:avatar'})
  @ValidateNested()
  @Type(()=>IdDto)
  avatar:Storage
}