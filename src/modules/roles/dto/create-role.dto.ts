import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { IdDto } from "~/common/dto/id.dto";
import { Type } from "class-transformer";
import { Storage } from "~/modules/tools/storage/storage.entity";
import { Region } from "~/modules/region/entities/region.entity";
import { Novel } from "~/modules/novel/entities/novel.entity";

export class CreateRoleDto {
  @IsNotEmpty({ message: '小说不能为空:novel_id' })
  @ValidateNested()
  @Type(() => IdDto)
  novel: Novel; // 小说id
  @IsNotEmpty({ message: '区域不能为空:region' })
  @ValidateNested()
  @Type(() => IdDto)
  region: Region; // 所属
  @IsNotEmpty({ message: '角色名称不能为空:name' })
  name: string; // 角色名称
  @IsNotEmpty({ message: '头像不能为空:avatar' })
  @ValidateNested()
  @Type(() => IdDto)
  avatar: Storage; // 头像
  @IsNotEmpty({ message: '画像不能为空:drawing' })
  @ValidateNested()
  @Type(() => IdDto)
  drawing: Storage; // 画像
  @IsNotEmpty({ message: '年龄不能为空:age' })
  @IsNumber()
  age: number; // 年龄
  @IsNotEmpty({ message: '性别不能为空:sex' })
  sex: string; // 性别
  @IsNotEmpty({ message: '身高不能为空:height' })
  @IsNumber()
  height: number; // 身高
  @IsNotEmpty({ message: '体重不能为空:weight' })
  @IsNumber()
  weight: number; // 体重
  @IsNotEmpty({ message: '简介不能为空:describe' })
  describe: string; // 描述
  hobby?: string; // 爱好
  ability?: string; // 能力
  occupation?: string; // 职业
}