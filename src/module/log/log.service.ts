import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/baseModule/baseService';
import { Repository } from 'typeorm';
import { Log } from './log.entity';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
interface CreateLog {
  message: string;
  createTime: Date;
  type: Log['type'];
}

@Injectable()
export class LogService extends BaseService<Log> {
  timer: NodeJS.Timeout | undefined;
  logKey = 'D-PASS:LOG';
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
    @InjectRedis() private readonly redis: Redis,
  ) {
    super(logRepository);
    this.saveCache = this.saveCache.bind(this);
  }

  private async saveCache() {
    const { logKey, error: errorFun } = this;
    const cacheStr = await this.redis.get(logKey);
    const cache: CreateLog[] = JSON.parse(cacheStr || '[]');
    const logs = cache.map((item) => {
      const log = new Log();
      log.message = item.message;
      log.type = item.type;
      log.createTime = item.createTime;
      return log;
    });
    try {
      await this.logRepository.save(logs);
      await this.redis.del(logKey);
    } catch (error) {
      errorFun(`日志缓存保存失败:${error.message}\n${JSON.stringify(error)}`);
    }
  }

  private async cacheMsg(msg: string, type: Log['type']) {
    const { logKey, timer, saveCache } = this;
    clearTimeout(timer);
    const cacheStr = await this.redis.get(logKey);
    const cache: CreateLog[] = JSON.parse(cacheStr || '[]');
    cache.push({ message: msg, type, createTime: new Date() });
    await this.redis.set(logKey, JSON.stringify(cache));
    setTimeout(() => {
      saveCache();
    }, 1000);
  }

  error(msg: string) {
    return this.cacheMsg(msg, 0);
  }
  info(msg: string) {
    return this.cacheMsg(msg, 1);
  }
}
