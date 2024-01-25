import { IEvent } from "../event";
import { Subscriber } from "./subscriber";

export class MachineStockLevelOkSubscriber extends Subscriber {
  public handle(event: IEvent): void {
    console.info(
      `[StockLevelOkSubscriber]:\tReceived StockLevelOk event from machine ${event.machineId()}.`
    );
  }
}
