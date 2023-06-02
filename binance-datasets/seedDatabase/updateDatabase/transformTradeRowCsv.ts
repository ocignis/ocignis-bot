import { Prisma } from '@prisma/client';

import { SymbolPair } from 'bot/common/types';

import { TradeRowCsv, TradeRowCsvIndex } from './getTradesFromCsv';

type TradeTransformed = Prisma.BacktestHistoricTradeCreateInput;
export type TradesTransformed = Array<TradeTransformed>;

type TransformTradeRowCsvParams = { symbolPair: SymbolPair; tradeRowCsv: TradeRowCsv };

export const transformTradeRowCsv = ({ symbolPair, tradeRowCsv }: TransformTradeRowCsvParams): TradeTransformed => {
  const tradeTransformed: TradeTransformed = {
    symbolPair,
    time: Number(tradeRowCsv[TradeRowCsvIndex.time]),
    price: tradeRowCsv[TradeRowCsvIndex.price],
    quantity: tradeRowCsv[TradeRowCsvIndex.quantity],
  };

  return tradeTransformed;
};
