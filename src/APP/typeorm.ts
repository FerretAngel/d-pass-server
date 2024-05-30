import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from 'src/module/content/entities/content.entity';
import { Novel } from 'src/module/novel/entities/novel.entity';
import { Role } from 'src/module/role/entities/role.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Volume } from 'src/module/volume/entities/volume.entity';

export default TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Novel, Content,Role,Volume],
  synchronize: true,
});
