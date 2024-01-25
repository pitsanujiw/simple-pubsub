import { EventType } from "../enum";
import { IEvent } from "./event.interface";

export abstract class MachineEvent implements IEvent {
  constructor(private readonly id: string) {}

  abstract type(): EventType;

  public machineId(): string {
    return this.id;
  }
}
