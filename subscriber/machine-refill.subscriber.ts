import { MachineRefillEvent } from "../event";
import { Subscriber } from "./subscriber";

export class MachineRefillSubscriber extends Subscriber {
  public handle(event: MachineRefillEvent): void {
    const machine = this.getMachine(event);
    if (!machine) {
      console.error(
        "[MachineRefillSubscriber]:\tMachine doesn't exist to process this task"
      );

      return;
    }

    const amountSold = event.getRefillQuantity();
    console.debug(
      `[MachineRefillSubscriber]:\tProcessing ${amountSold} refill on machine ${machine.id}...`
    );
    machine.saleStock(amountSold);
  }
}
