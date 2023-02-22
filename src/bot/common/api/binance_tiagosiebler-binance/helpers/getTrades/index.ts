// https://binance-docs.github.io/apidocs/spot/en/#recent-trades-list
// Weight(IP): 1

import { binanceServiceMain } from '../..';
import { SymbolPair } from '../../../../types';

import { TradesTransformed, transformTradesResponse } from './transformTradesResponse';

const TRADES_MAX_LIMIT = 1000;

type GetTradesParams = {
  symbolPair: SymbolPair;
};

export type GetTrades = (params: GetTradesParams) => Promise<TradesTransformed>;

/**
 * Trades are sorted by time asc.
 * (Latest trades are added at the end of the array.)
 */
export const getTrades: GetTrades = async ({ symbolPair }) => {
  const trades = await binanceServiceMain.getRecentTrades({ symbol: symbolPair, limit: TRADES_MAX_LIMIT });

  const tradesTransformed = transformTradesResponse(trades);

  return tradesTransformed;
};
