import { Module } from '@nestjs/common';

import { TopicsPublisherService, TopicsSubscriberService } from './services';
import { TopicsController } from './topics.controller';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [TopicsController],
  providers: [TopicsPublisherService, TopicsSubscriberService],
})
export class TopicsModule {}
