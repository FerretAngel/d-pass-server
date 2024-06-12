import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: '小说不能为空:novel' })
  novel: number; // 小说id
  @IsNotEmpty({ message: '所属不能为空:belongId' })
  belongId: number; // 所属
  @IsNotEmpty({ message: '角色名称不能为空:name' })
  name: string; // 角色名称
  @IsNotEmpty({ message: '头像不能为空:avatar' })
  avatar: string; // 头像
  @IsNotEmpty({ message: '画像不能为空:drawing' })
  drawing: string; // 画像
  @IsNotEmpty({ message: '年龄不能为空:age' })
  age: number; // 年龄
  @IsNotEmpty({ message: '性别不能为空:sex' })
  sex: string; // 性别
  @IsNotEmpty({ message: '身高不能为空:height' })
  height: number; // 身高
  @IsNotEmpty({ message: '体重不能为空:weight' })
  weight: number; // 体重
  @IsNotEmpty({ message: '简介不能为空:describe' })
  describe: string; // 描述
  hobby?: string; // 爱好
  ability?: string; // 能力
  occupation?: string; // 职业
}
