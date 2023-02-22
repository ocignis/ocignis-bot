export type Kline = {
  close: number;
  volume: number;
  endTime: number;
};

export type Klines = Array<Kline>;
