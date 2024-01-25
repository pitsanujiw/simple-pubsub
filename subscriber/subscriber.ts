import { IEvent } from "../event";
import { MachineInstance } from "../machine";
import { ISubscriber } from "./subscriber.interface";

export abstract class Subscriber implements ISubscriber {
  constructor(private machines: MachineInstance[]) {}

  public abstract handle(event: IEvent): void;

  public getMachine(event: IEvent): MachineInstance | undefined {
    const machineIds = this.machines.map((machine) => machine.id);

    const index = machineIds.indexOf(event.machineId());
    if (index === -1) {
      return undefined;
    }

    return this.machines[index];
  }

  public name(): string {
    return this.constructor.name;
  }
}
