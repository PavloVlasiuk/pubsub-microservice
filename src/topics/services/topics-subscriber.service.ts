import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, map, Observable } from 'rxjs';

import { RedisService } from '../../redis/redis.service';

@Injectable()
export class TopicsSubscriberService {
  constructor(
    private readonly redisService: RedisService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async subscribe(topic: string): Promise<Observable<MessageEvent>> {
    await this.redisService.subscribe(topic);

    return fromEvent(this.eventEmitter, `topic:${topic}`).pipe(
      map<string, MessageEvent>(
        (data) => ({ data: JSON.parse(data) }) as MessageEvent,
      ),
    );
  }
}
