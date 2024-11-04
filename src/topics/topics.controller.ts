import { Body, Controller, Param, Post, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';

import { TopicsPublisherService, TopicsSubscriberService } from './services';
import { EmptyBodyPipe } from '../common/pipes';
import { AnyObject } from '../common/types';

@Controller('topics')
export class TopicsController {
  constructor(
    private readonly topicsPublisherService: TopicsPublisherService,
    private readonly topicsSubscriberService: TopicsSubscriberService,
  ) {}

  @Post(':topic')
  async publish(
    @Param('topic') topic: string,
    @Body(new EmptyBodyPipe()) body: AnyObject,
  ): Promise<void> {
    await this.topicsPublisherService.publish(topic, body);
  }

  @Sse(':topic')
  async subscribe(
    @Param('topic') topic: string,
  ): Promise<Observable<MessageEvent>> {
    return await this.topicsSubscriberService.subscribe(topic);
  }
}
