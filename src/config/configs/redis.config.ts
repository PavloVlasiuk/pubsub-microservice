import { registerAs } from '@nestjs/config';
import { RedisOptions } from 'ioredis';

export default registerAs(
  'redis',
  (): Record<string, RedisOptions> => ({
    options: {
      port: process.env.REDIS_PORT ? +process.env.REDIS_PORT : undefined,
      host: process.env.REDIS_HOST,
    },
  }),
);
