import { IEvent } from "../event";
import { MachineInstance } from "../machine";
import { ISubscriber } from "./subscriber.interface";

export abstract class Subscriber implements ISubscriber {
  constructor(private machines: MachineInstance[]) {}

  public abstract handle(event: IEvent): void;

  public getMachine(event: IEvent): MachineInstance | undefined {
    const machineIndexIds = this.machines.findIndex((machine) => machine.id === event.machineId());
    if (machineIndexIds === -1) {
      return undefined;
    }

    return this.machines[machineIndexIds];
  }

  public name(): string {
    return this.constructor.name;
  }
}
