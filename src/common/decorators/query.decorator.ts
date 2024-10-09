import { ExecutionContext, Query, createParamDecorator } from "@nestjs/common";
import { CommonEntity } from "../entity/common.entity";
import { FindOptionsWhere, IsNull, Like, Not } from "typeorm";

export const QueryPage=createParamDecorator((data: unknown, ctx: ExecutionContext)=>{
  const request = ctx.switchToHttp().getRequest();
  // 获取查询参数
  const query = request.query;
  const {page,pageSize,select,isOr,novel,parent,...params} = query
  // 将novel和parent转换为对象
  if(novel){
    params.novel={id:Number(novel)}
  }
  if(parent){
    params.parent={id:Number(parent)}
  }
  return new QueryDto(page,pageSize,select,isOr,params)
})

export class QueryDto<T extends CommonEntity>{
  constructor(
   readonly page:number=1,
   readonly pageSize:number=10,
   readonly isOr:boolean=false,
   readonly select?:keyof T,
   readonly params?:Partial<T>,
  ){}
  get skip() {
    return (this.page - 1) * this.pageSize;
  }
  get take() {
    return this.pageSize;
  }

  private get andWhere():FindOptionsWhere<T>[]{
    const {params} = this
    // @ts-ignore
    return Object.keys(params).map(key=>{
      const value = params[key]
      switch(typeof value){
        case "string":
          const lowerValue = value.toLocaleLowerCase()
          if(lowerValue==='null'){
            return {[key]:IsNull()}
          }else if(lowerValue==='notnull'){
            return {[key]:Not(IsNull())}
          }
          return {[key]:Like(`%${value}%`)}
        case "number":
          return {[key]:value}
        case "boolean":
          return {[key]:value?1:0}
        case "object":
          return {[key]:value}
        default:
          return null
      }
    }).filter(item=>item)
  }
  private get orWhere():FindOptionsWhere<T>{
    const {params} = this
    const res:any={}
    for (const key in params) {
      if (Object.hasOwnProperty.call(params, key)) {
        const value = params[key];
        switch(typeof value){
          case "string":
            const lowerValue = value.toLocaleLowerCase()
            if(lowerValue==='null'){
              res[key]=IsNull()
            }else if(lowerValue==='notnull'){
              res[key] = Not(IsNull())
            }else {
              res[key] = Like(`%${value}%`)
            }
            break;
          case "number":
            res[key]=value
            break;
          case "boolean":
            res[key] = value?1:0
            break;
          case "object":
            res[key] = value
            break;
        }
      }
    }
    return res
  }

  get where():FindOptionsWhere<T> | FindOptionsWhere<T>[]{
    const {isOr} = this
    return isOr?this.orWhere:this.andWhere
  }

  getReturn<T>(data: T[], total: number) {
    const { page, pageSize, params, isOr } = this;
    return {
      meta: { currentPage:page, pageSize, totalItems:total },
      params: {
        ...params,
        or: isOr,
      },
      items: data,
    };
  }
}