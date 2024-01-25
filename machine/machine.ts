import {
  MachineLowStockWarningEvent,
  MachineStockLevelOkEvent,
} from "../event";
import { IPublishSubscribeService } from "../pubsub";
import { IMachineInstance } from "./machine.interface";

export class MachineInstance implements IMachineInstance {
  private readonly threshold: number = 2;
  private pubSubService: IPublishSubscribeService;

  public stockLevel: number = 10;
  public id: string;

  constructor(id: string, pubSubService: IPublishSubscribeService) {
    this.id = id;
    this.pubSubService = pubSubService;
  }

  private handle(amount: number): void {
    if (amount === 0) {
      console.error(`[MachineInstance]:\t amount is zero.`);

      return;
    }

    const currentStock = this.stockLevel;
    const newStock = this.stockLevel + amount;
    if (newStock < 0) {
      console.warn(
        `[MachineInstance]:\t stock is unavailable please refill them.`
      );
      const lowStockWarningEvent = new MachineLowStockWarningEvent(this.id);
      this.pubSubService.publish(lowStockWarningEvent);
      console.warn(
        `[MachineInstance]:\tPublished LowStockWarning event from machine ${this.id}.`
      );

      return;
    }

    this.stockLevel = newStock;

    const isStockLevelOk =
      currentStock <= this.threshold && newStock > this.threshold;

    const isLowStockWarning =
      currentStock > this.threshold && newStock <= this.threshold;

    console.log(
      `[MachineInstance]:\tAdjusted stock for machine ${this.id} from ${currentStock} to ${newStock}.`
    );
    if (isStockLevelOk) {
      const stockLevelOkEvent = new MachineStockLevelOkEvent(this.id);
      this.pubSubService.publish(stockLevelOkEvent);
      console.log(
        `[MachineInstance]:\tPublished StockLevelOk event from machine ${this.id}.`
      );
      return;
    }

    if (isLowStockWarning) {
      const lowStockWarningEvent = new MachineLowStockWarningEvent(this.id);
      this.pubSubService.publish(lowStockWarningEvent);
      console.log(
        `[MachineInstance]:\tPublished LowStockWarning event from machine ${this.id}.`
      );
    }
  }

  public refillStock(amount: number): void {
    this.handle(amount);
  }

  public saleStock(amount: number): void {
    this.handle(-amount);
  }
}
