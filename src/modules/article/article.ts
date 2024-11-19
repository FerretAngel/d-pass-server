import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { CommonEntity } from "~/common/entity/common.entity";
import { Novel } from "../novel/entities/novel.entity";
import { Role } from "../roles/role.entity";
import { IsIn, IsNotEmpty, IsNumber, IsString, ValidateIf, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { IdDto } from "~/common/dto/id.dto";
import { Optional } from "@nestjs/common";

@Entity('article')
export class Article extends CommonEntity{
  @Column({default:0})
  order:number
  @ManyToOne(()=>Novel)
  @JoinColumn({name:'novel_id'})
  novel:Novel
  @Column()
  title:string
  @Column({default:''})
  remark:string
  @Column({select:false,type:'text',nullable:true})
  content?:string
  @ManyToOne(()=>Article,{nullable:true})
  @JoinColumn({name:'parent_id'})
  parent?:Article
  @ManyToMany(()=>Role)
  @JoinTable({
    name:'article_role',
    joinColumn:{
      name:'article_id',
      referencedColumnName:'id'
    },
    inverseJoinColumn:{
      name:'role_id',
      referencedColumnName:'id'
    }
  })
  roles?:Role[]
}


export class ArticleDto{
  @IsNotEmpty({message:'排序不能为空:order'})
  @IsNumber()
  order:number

  @IsNotEmpty({ message: '小说不能为空:novel' })
  @ValidateNested()
  @Type(()=>IdDto)
  novel:Novel

  @IsNotEmpty()
  @IsString()
  title:string

  @ValidateNested()
  @Type(()=>IdDto)
  @Optional()
  parent:Article

  @ValidateIf((item)=> typeof item.parent !=='undefined' )
  @IsNotEmpty()
  @IsString()
  remark?:string

  @ValidateIf((item)=> typeof item.parent !=='undefined' )
  @IsString()
  content?:string

  @ValidateIf((item)=> typeof item.parent !=='undefined' )
  @ValidateNested({each:true})
  @Type(()=>IdDto)
  roles?:Role[]
}

export class ArticleNextDto{
  @IsNotEmpty()
  @IsString()
  token:string
}