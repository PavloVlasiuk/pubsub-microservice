import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigService } from './app-config.service';
import configs from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: configs,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
