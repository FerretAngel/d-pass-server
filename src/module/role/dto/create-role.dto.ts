import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: '小说id不能为空:novel' })
  @IsNumber({}, { message: '小说id必须是数字' })
  novel: number; // 小说id
  name?: string; // 角色名称
  avatar?: string; // 头像
  drawing?: string; // 画像
  age?: number; // 年龄
  sex?: string; // 性别
  height?: number; // 身高
  weight?: number; // 体重
  describe?: string; // 描述
  belong?: string; // 所属
  hobby?: string; // 爱好
  ability?: string; // 能力
  occupation?: string; // 职业
}
