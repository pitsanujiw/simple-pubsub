import { MachineRefillEvent, MachineSaleEvent, IEvent } from "../event";
import { MachineInstance } from "../machine";

// helpers
const randomMachine = (machines: MachineInstance[]): string => {
  const machine = machines[Math.floor(Math.random() * machines.length)];

  return machine.id;
};

export const eventGenerator = (machines: MachineInstance[]): IEvent => {
  const random = Math.random();
  const machineId = randomMachine(machines);
  if (random < 0.5) {
    const saleQty = Math.random() < 0.5 ? 1 : 2; // 1 or 2
    const saleEvent = new MachineSaleEvent(machineId, saleQty);
    console.info(
      `[EventGenerator]:\tCreated ${saleEvent.type()} event with quantity ${saleQty} for machine ${machineId}.`
    );

    return saleEvent;
  }

  const refillQty = Math.random() < 0.5 ? 3 : 5; // 3 or 5
  const refillEvent = new MachineRefillEvent(machineId, refillQty);
  console.info(
    `[EventGenerator]:\tCreated ${refillEvent.type()} event with quantity ${refillQty} for machine ${machineId}.`
  );

  return refillEvent;
};
