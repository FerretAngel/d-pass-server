export class BaseQuery<T = any> {
  page: number = 1;
  pageSize: number = 10;
  isOr: boolean = false;
  queryParams: Partial<T>;
  constructor(
    page: string | number = '1',
    pageSize: string | number = '10',
    isOr = false,
    param?: Partial<T>,
  ) {
    if (typeof page === 'string') this.page = parseInt(page);
    else this.page = page;
    if (typeof pageSize === 'string') this.pageSize = parseInt(pageSize);
    else this.pageSize = pageSize;
    this.queryParams = param;
    this.isOr = isOr;
    if (this.page < 1) this.page = 1;
    if (this.pageSize < 1) this.pageSize = 1;
  }

  get skip() {
    return (this.page - 1) * this.pageSize;
  }
  get take() {
    return this.pageSize;
  }

  get key() {
    const str = `${this.page}-${this.pageSize}-${JSON.stringify(
      this.queryParams,
    )}-${this.isOr}`;
    return str;
  }

  removeParams(key: keyof T) {
    const value = this.queryParams[key];
    delete this.queryParams[key];
    return value;
  }

  getParam(key: keyof T) {
    return this.queryParams[key];
  }

  getReturn<T>(data: T[], total: number) {
    const { page, pageSize, queryParams, isOr } = this;
    return {
      pagenation: { page, pageSize, total },
      params: {
        ...queryParams,
        or: isOr,
      },
      list: data,
    };
  }
}
