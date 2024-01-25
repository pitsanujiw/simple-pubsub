import { EventType } from "../enum";
import { MachineEvent } from "./abstract-event";

export class MachineSaleEvent extends MachineEvent {
  constructor(id: string, private sold: number) {
    super(id);
  }
  
  public getSoldQuantity(): number {
    return this.sold;
  }

  public type(): EventType {
    return EventType.SALE;
  }
}
