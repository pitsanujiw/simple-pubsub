import { IEvent } from "../event";
import { Subscriber } from "./subscriber";

export class MachineLowStockWarningSubscriber extends Subscriber {
  public handle(event: IEvent): void {
    console.info(
      `[LowStockWarningSubscriber]:\tReceived LowStockWarning event from machine ${event.machineId()}.`
    );
  }
}
