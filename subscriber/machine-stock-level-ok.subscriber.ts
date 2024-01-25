import { EventType } from "../enum";
import { IEvent } from "../event";
import { Subscriber } from "./subscriber";

export class MachineStockLevelOkSubscriber extends Subscriber {
  public handle(event: IEvent): void {
    console.info(
      `[StockLevelOkSubscriber]:\tReceived ${EventType.STOCK_LEVEL_OK} event from machine ${event.machineId()}.`
    );
  }
}
