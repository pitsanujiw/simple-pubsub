import { EventType } from "../enum";
import { ISubscriber } from "../subscriber";

export type MachineSubscriber = {
  type: EventType;
  handler: ISubscriber;
};
