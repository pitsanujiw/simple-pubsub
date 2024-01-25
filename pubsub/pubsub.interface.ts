import { EventType } from '../enum';
import { IEvent } from '../event';
import { ISubscriber } from '../subscriber';

export interface IPublishSubscribeService {
  publish(event: IEvent): void;
  subscribe(type: EventType, handler: ISubscriber): void;
  unsubscribe(type: EventType, handler: ISubscriber): void;
}
