import { EventType } from "../enum";
import { IEvent } from "../event";
import { ISubscriber } from "../subscriber";
import { IPublishSubscribeService } from "./pubsub.interface";

// implementations
export class PublishSubscribeService implements IPublishSubscribeService {
  private subscriptions = new Map<EventType, Set<ISubscriber>>();
  private registerSubscriptions = new Map<string, boolean>();

  private getRegisterSubscription(
    type: EventType,
    handler: ISubscriber
  ): string {
    return `${type}-${handler.name()}`;
  }

  public publish(event: IEvent): void {
    console.debug(
      `[PublishSubscribeService]:\Processing ${event.type()} to publish message...`
    );
    const hasSubscribers = this.subscriptions.has(event.type());
    if (!hasSubscribers) {
      console.error("[PublishSubscribeService]:\t subscribe doesn't exist");

      return;
    }

    const subscribers = this.subscriptions.get(event.type());
    if (!subscribers?.size) {
      console.error("[PublishSubscribeService]:\t handle doesn't exist");

      return;
    }

    for (const subscriber of [...subscribers]) {
      subscriber.handle(event);
    }
  }

  public subscribe(type: EventType, handler: ISubscriber): void {
    const key = this.getRegisterSubscription(type, handler);
    if (this.registerSubscriptions.has(key)) {
      console.error(
        `[PublishSubscribeService]:\t ${handler.name()} had already to subscribe by ${type}`
      );

      return;
    }

    const subscribers = this.subscriptions.get(type);
    if (!subscribers) {
      this.subscriptions.set(type, new Set([handler]));
    } else {
      subscribers.add(handler);
    }

    // registers subscribe for validate duplicate new subscriber
    this.registerSubscriptions.set(key, true);

    console.log(
      `[PublishSubscribeService]:\tSubscribed ${handler.name()} to ${type}.`
    );
  }

  public unsubscribe(type: EventType, handler: ISubscriber): void {
    const key = this.getRegisterSubscription(type, handler);
    if (!this.registerSubscriptions.has(key)) {
      console.error(
        `[PublishSubscribeService]:\t ${handler.name()} doesn't exist this subscribers by ${type}`
      );

      return;
    }

    const subscribers = this.subscriptions.get(type);
    if (!subscribers?.size) {
      console.warn(
        `[PublishSubscribeService]:\tSubscription: ${type} doesn't exist`
      );

      return;
    }

    subscribers.delete(handler);

    this.registerSubscriptions.delete(key);

    console.log(
      `[PublishSubscribeService]:\tUnsubscribed ${handler.name()} is completed.`
    );
  }
}
