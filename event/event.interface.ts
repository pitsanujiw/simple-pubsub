import { EventType } from "../enum";

export interface IEvent {
  type(): EventType;
  machineId(): string;
}
