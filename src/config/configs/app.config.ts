import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    port: process.env.PORT ? +process.env.PORT : 3000,
    host: process.env.HOST || '0.0.0.0',
    globalPrefix: '/api',
  }),
);
