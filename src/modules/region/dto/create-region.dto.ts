import { IntersectionType, PartialType } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { PagerDto } from "~/common/dto/pager.dto"
import { NovelDto } from "~/modules/novel/novel.dto"

export class CreateRegionDto {
  @IsNotEmpty()
  novel_id:number
  @IsNotEmpty()
  name:string
  parentId?:number
  avatar_id?:number
  remark?:string
}
export class RegionUpdateDto extends PartialType(NovelDto) {}

export class RegionQueryDto extends IntersectionType(PagerDto, NovelDto) {}
