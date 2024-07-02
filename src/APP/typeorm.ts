import { TypeOrmModule } from '@nestjs/typeorm';
import { Belong } from 'src/module/belong/entities/belong.entity';
import { Comic } from 'src/module/comic/entities/comic.entity';
import { Content } from 'src/module/content/entities/content.entity';
import { Info } from 'src/module/info/entities/info.entity';
import { Log } from 'src/module/log/log.entity';
import { Novel } from 'src/module/novel/entities/novel.entity';
import { Role } from 'src/module/role/entities/role.entity';
import { User } from 'src/module/user/entities/user.entity';
import { World } from 'src/module/world/entities/world.entity';

export default TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Novel, Content, Role, Log, Belong, Comic, World, Info],
  // synchronize: true,
  cache: {
    type: 'ioredis',
    options: {
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    },
  },
});
