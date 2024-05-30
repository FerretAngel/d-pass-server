import { IsNotEmpty } from "class-validator"

export class CreateVolumeDto {
  @IsNotEmpty({message:'小说id不能为空:novel'})
  novel:number
  @IsNotEmpty({message:'卷名不能为空:name'})
  name:string
  contentIds?:number[]
}
