import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Redis } from 'ioredis';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { REDIS_CONNECTION } from './redis.constants';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly publisher: Redis;
  private readonly subscriber: Redis;

  constructor(
    @Inject(REDIS_CONNECTION)
    private readonly redis: Redis,
    @InjectPinoLogger(RedisService.name)
    private readonly logger: PinoLogger,
    private readonly eventEmitter: EventEmitter2,
  ) {
    redis.on('connect', () => logger.info('Trying to connect to redis...'));
    redis.on('ready', () => logger.info('Redis connected.'));
    redis.on('error', (error) => logger.error(`Redis error: ${error}`));
    redis.on('close', () => logger.info('Redis connection closed'));

    this.publisher = redis;
    this.subscriber = redis.duplicate();
  }

  onModuleInit() {
    this.subscriber.on('message', (channel, message) => {
      const event = `topic:${channel}`;
      this.eventEmitter.emit(event, message);
      this.logger.info(`${event} event emitted`);
    });
  }

  onModuleDestroy() {
    this.publisher.disconnect();
    this.subscriber.disconnect();
  }

  async publish(channel: string, message: string) {
    await this.publisher.publish(channel, message);
  }

  async subscribe(channel: string) {
    await this.subscriber.subscribe(channel);
  }
}
