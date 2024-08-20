import { NotFoundException } from '@nestjs/common'
import { In, Repository } from 'typeorm'

import { PagerDto } from '~/common/dto/pager.dto'

import { CommonEntity } from '~/common/entity/common.entity'

import { paginate } from '../paginate'
import { Pagination } from '../paginate/pagination'
import { QueryDto } from '~/common/decorators/query.decorator'

export class BaseService<E extends CommonEntity, R extends Repository<E> = Repository<E>> {
  constructor(
    private repository: R,
    private readonly param:{
      relations:(keyof E)[],
      relationsFindFunc: {
        [K in keyof E]?: (param:E[K]) => Promise<E[K]>
      }
    }={relations:[],relationsFindFunc:{}}
  ) {
  }

  async list({
    page,
    pageSize,
  }: PagerDto): Promise<Pagination<E>> {
    return paginate(this.repository, { page, pageSize })
  }

  async findAll(query: QueryDto<E>) {
    const [list, total] = await this.repository.findAndCount({
      take: query.take,
      skip: query.skip,
      where: query.where,
      relations: this.param.relations as string[],
    })
    return query.getReturn(list, total)
  }

  async findOne(id: number): Promise<E> {
    const item = await this.repository.findOne({
      // @ts-ignore
      where: { id },
      relations: this.param.relations as string[]
    })
    // const item = await this.repository.createQueryBuilder().where({ id}).getOne()
    if (!item)
      throw new NotFoundException('未找到该记录')

    return item
  }

  async findMany(ids: number[]) {
    return this.repository.find({
      // @ts-ignore
      where: {
        id: In(ids),
      },
      relations: this.param.relations as string[],
    })
  }

  // async create(dto: Partial<E>) {
  //   const {relations} = this
  //   const createData={}
  //   Object.keys(dto).forEach((key)=>{
  //     const value = dto[key]
  //     if(relations.includes(key)){

  //     }
  //   })
  //   // return await this.repository.save(dto)
  // }
  async create(dto: Partial<E>) {
    const { relations, relationsFindFunc } = this.param;
    const createData: any = {};

    for (const [key, value] of Object.entries(dto)) {
      if (typeof value === 'object' &&
        Object.hasOwn(value, 'id') &&
        relations.includes(key as keyof E) &&
        relationsFindFunc[key as keyof E]) {
        createData[key as keyof E] = await relationsFindFunc[key as keyof E]!(value);
      } else {
        createData[key as keyof E] = value as E[keyof E];
      }
    }

    return await this.repository.save(createData);
  }

  async update(id: number, dto: Partial<E>) {
    const { relations, relationsFindFunc } = this.param;
    // @ts-ignore
    const existingEntity = await this.repository.findOne({ where: { id } });
    if (!existingEntity) {
      throw new Error(`Entity with id ${id} not found`);
    }
    const updateData: any = { ...existingEntity };
    for (const [key, value] of Object.entries(dto)) {
      if (typeof value === 'object' &&
        Object.hasOwn(value, 'id') &&
        relations.includes(key as keyof E) &&
        relationsFindFunc[key as keyof E]) {
        updateData[key as keyof E] = await relationsFindFunc[key as keyof E]!(value);
      } else {
        updateData[key as keyof E] = value as E[keyof E];
      }
    }
    return await this.repository.update(id,updateData);
  }

  async delete(id: number): Promise<void> {
    const item = await this.findOne(id)
    await this.repository.remove(item)
  }
}
