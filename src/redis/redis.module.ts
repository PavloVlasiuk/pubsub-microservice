import { Module } from '@nestjs/common';
import { Redis, RedisOptions } from 'ioredis';

import { AppConfigModule, AppConfigService } from '../config';
import { REDIS_CONNECTION } from './redis.constants';
import { RedisService } from './redis.service';

@Module({
  imports: [AppConfigModule],
  providers: [
    {
      provide: REDIS_CONNECTION,
      useFactory: (config: AppConfigService) => {
        return new Redis(config.get<RedisOptions>('redis.options'));
      },
      inject: [AppConfigService],
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
