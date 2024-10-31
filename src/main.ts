import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { AppConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfigService = app.get<AppConfigService>(AppConfigService);

  const PORT = appConfigService.get<number>('app.port');

  const HOST = appConfigService.get<string>('app.host');

  const GLOBAL_PREFIX = appConfigService.get<string>('app.globalPrefix');

  app.setGlobalPrefix(GLOBAL_PREFIX);

  const logger = app.get<Logger>(Logger);

  app.useLogger(logger);

  await app.listen(PORT, HOST, () => {
    logger.log(`Server is litening on http://${HOST}:${PORT}`);
  });
}
bootstrap();
