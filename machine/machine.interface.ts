export interface IMachineInstance {
  refillStock(amount: number): void;
  saleStock(amount: number): void;
}
