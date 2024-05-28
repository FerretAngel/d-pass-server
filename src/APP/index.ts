import env from './env';
import typeorm from './typeorm';
import mail from './mail';
import redis from './redis';
export default [env, redis, typeorm, mail];
