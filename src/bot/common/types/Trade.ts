export type Trade = {
  time: number;
  price: number;
  quantity: number;
  volume: number;
};

export type Trades = Array<Trade>;
