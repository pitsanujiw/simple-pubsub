import { MachineSaleEvent } from "../event";
import { Subscriber } from "./subscriber";

export class MachineSaleSubscriber extends Subscriber {
  public handle(event: MachineSaleEvent): void {
    const machine = this.getMachine(event);
    if (!machine) {
      console.error(
        "[MachineSaleSubscriber]:\tMachine doesn't exist to process this task"
      );

      return;
    }

    const amountSold = event.getSoldQuantity();
    console.debug(
      `[MachineSaleSubscriber]:\tProcessing ${amountSold} sale on machine ${machine.id}...`
    );
    machine.saleStock(amountSold);
  }
}
