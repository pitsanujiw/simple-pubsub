import { EventType } from "../enum";
import { MachineEvent } from "./abstract-event";

export class MachineStockLevelOkEvent extends MachineEvent {
  public type(): EventType {
    return EventType.STOCK_LEVEL_OK;
  }
}
