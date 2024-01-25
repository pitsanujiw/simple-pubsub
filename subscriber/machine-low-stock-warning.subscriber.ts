import { EventType } from "../enum";
import { IEvent } from "../event";
import { Subscriber } from "./subscriber";

export class MachineLowStockWarningSubscriber extends Subscriber {
  public handle(event: IEvent): void {
    console.info(
      `[LowStockWarningSubscriber]:\tReceived ${EventType.LOW_STOCK_WARNING} event from machine ${event.machineId()}.`
    );
  }
}
