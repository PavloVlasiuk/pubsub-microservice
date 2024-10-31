import { Module } from '@nestjs/common';
import { LoggerModule, Params } from 'nestjs-pino';

import { AppConfigModule, AppConfigService } from './config';

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
  ],
})
export class AppModule {}
