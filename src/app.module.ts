import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerModule, Params } from 'nestjs-pino';

import { AppConfigModule, AppConfigService } from './config';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (config: AppConfigService) => {
        return config.get<Params>('logger.params');
      },
      inject: [AppConfigService],
    }),
    EventEmitterModule.forRoot(),
    RedisModule,
  ],
})
export class AppModule {}
