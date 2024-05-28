import { RedisModule } from "@nestjs-modules/ioredis";

export default RedisModule.forRoot({
  type: 'single',
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
})