import { In, Like, Repository, SelectQueryBuilder } from 'typeorm';
import { BaseEntity } from './baseEntity';
import { BaseQuery } from './baseQuery';

export class BaseService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}
  async create(createDto: Partial<T>) {
    return this.repository.save(createDto as any);
  }
  async findById(id: number) {
    if (!id) throw new Error('id is required');
    return this.repository.findOne({ where: { id: id as any } });
  }
  async findByIds(ids: number[]) {
    return this.repository.findBy({ id: In(ids) as any });
  }
  async update(id: number, updateDto: Partial<T>) {
    if (!id) throw new Error('id is required');
    const old = await this.findById(id);
    if (!old) throw new Error('not found');
    Object.assign(old, updateDto);
    return this.repository.update(id, old as any);
  }
  async remove(id: number) {
    if (!id) throw new Error('id is required');
    return this.repository.softDelete(id);
  }
  generateParams(
    queryBuilder: SelectQueryBuilder<T>,
    params: { [key: string]: any },
    isOr = false,
  ) {
    for (const key in params) {
      if (Object.hasOwnProperty.call(params, key)) {
        const value = params[key];
        if (typeof value === 'undefined') continue;
        if (isOr) {
          queryBuilder.orWhere({ [key]: Like(`%${value}%`) });
        } else {
          queryBuilder.andWhere({ [key]: Like(`%${value}%`) });
        }
      }
    }
  }
  generateQuerySql(sql: string, params: Array<number | string>) {
    return sql.replace(/\?/g, () => {
      const value = params.shift();
      if (typeof value === 'number') return `${value}`;
      return `'${value}'`;
    });
  }
  async query(baseQuery: BaseQuery<T>) {
    const isOr = !!baseQuery.isOr;
    // query构造器
    const queryBuilder = this.repository
      .createQueryBuilder()
      .skip(baseQuery.skip)
      .take(baseQuery.take)
      .orderBy('createTime', 'DESC');
    this.generateParams(queryBuilder, baseQuery.queryParams, isOr);
    // 缓存
    const temp = queryBuilder.getQueryAndParameters();
    const sql = this.generateQuerySql(temp[0], temp[1]);
    // 查询
    const [data, total] = await queryBuilder
      .cache(sql, +process.env.DB_CACHE_TIME)
      .getManyAndCount();
    return baseQuery.getReturn(data, total);
  }
}
