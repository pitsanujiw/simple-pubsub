import { EventType } from "./enum";
import { MachineInstance } from "./machine/machine";
import { PublishSubscribeService } from "./pubsub/pubsub";
import {
  MachineSaleSubscriber,
  MachineRefillSubscriber,
  MachineLowStockWarningSubscriber,
  MachineStockLevelOkSubscriber,
} from "./subscriber";
import { MachineSubscriber } from "./type";
import { eventGenerator } from "./util/util";

// program
const main = async () => {
  // create 3 machines with a quantity of 10 stock
  const machineIds = ["001", "002", "003"];

  // create the PubSub service
  const pubSubService = new PublishSubscribeService();

  // create machines
  const machines = machineIds.map(
    (machineId) => new MachineInstance(machineId, pubSubService)
  );

  // create a machine sale event subscriber. inject the machines (all subscribers should do this)
  const subscribers: MachineSubscriber[] = [
    {
      type: EventType.SALE,
      handler: new MachineSaleSubscriber(machines),
    },
    {
      type: EventType.REFILL,
      handler: new MachineRefillSubscriber(machines),
    },
    {
      type: EventType.LOW_STOCK_WARNING,
      handler: new MachineLowStockWarningSubscriber(machines),
    },
    {
      type: EventType.STOCK_LEVEL_OK,
      handler: new MachineStockLevelOkSubscriber(machines),
    },
  ];

  // subscribe handler by event
  for (const subscribe of subscribers) {
    console.log(
      `[Main]:\tRegistering subscribe - ${
        subscribe.type
      } - ${subscribe.handler.name()}...`
    );
    // inject handler in subscriber by event type
    pubSubService.subscribe(subscribe.type, subscribe.handler);
  }

  console.log(`\t**********************************\t`);

  // create 5 random events
  const events = [...Array(5).keys()].map(() => eventGenerator(machines));

  console.log(`\t**********************************\t`);

  // publish the events
  for (const event of events) {
    pubSubService.publish(event);
  }

  console.log(`\t**********************************\t`);

  console.warn(`[Main]:\tProcess terminating...`);

  for (const subscribe of subscribers) {
    pubSubService.unsubscribe(subscribe.type, subscribe.handler);
  }
};

main()
  .then(() => {
    console.log("[Main]:\tDONE!");
  })
  .catch((err) => console.error("[MAIN]: ", JSON.stringify(err, undefined, 2)));
