import { RawTrade } from 'binance';

export type TradeTransformed = {
  id: number;
  price: number;
  quantity: number;
  quoteQuantity: number;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
};
export type TradesTransformed = Array<TradeTransformed>;

export const transformTradesResponse = (trades: ReadonlyArray<RawTrade>): TradesTransformed => {
  const tradesTransformed = trades.map((trade) => transformTradeResponse(trade));

  return tradesTransformed;
};

export const transformTradeResponse = (kline: RawTrade): TradeTransformed => {
  const tradeTransformed: TradeTransformed = {
    id: kline.id,
    price: Number(kline.price),
    quantity: Number(kline.qty),
    quoteQuantity: Number(kline.quoteQty),
    time: kline.time,
    isBuyerMaker: kline.isBuyerMaker,
    isBestMatch: kline.isBestMatch,
  };

  return tradeTransformed;
};
