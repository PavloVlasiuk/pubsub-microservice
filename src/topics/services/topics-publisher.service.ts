import { Injectable } from '@nestjs/common';

import { AnyObject } from '../../common/types';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class TopicsPublisherService {
  constructor(private readonly redisService: RedisService) {}

  async publish(topic: string, data: AnyObject): Promise<void> {
    const strData = JSON.stringify(data);

    await this.redisService.publish(topic, strData);
  }
}
