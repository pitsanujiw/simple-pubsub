import { EventType } from "../enum";
import { MachineEvent } from "./abstract-event";

export class MachineRefillEvent extends MachineEvent {
  constructor(id: string, private refill: number) {
    super(id);
  }

  public getRefillQuantity(): number {
    return this.refill;
  }

  public type(): EventType {
    return EventType.REFILL;
  }
}
