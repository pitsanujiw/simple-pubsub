import { EventType } from "../enum";
import { MachineEvent } from "./abstract-event";

export class MachineLowStockWarningEvent extends MachineEvent {
  public type(): EventType {
    return EventType.LOW_STOCK_WARNING;
  }
}
