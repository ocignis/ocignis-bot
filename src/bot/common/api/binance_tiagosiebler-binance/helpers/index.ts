import { getCoinsBalances } from './getCoinsBalances';
import { getKlines } from './getKlines';
export type { KlineTransformed as KlineRestApi, KlinesTransformed as KlinesRestApi } from './getKlines/types';
import { getSymbolsPrices } from './getSymbolsPrices';

export const binanceHelpers = {
  getCoinsBalances,
  getKlines,
  getSymbolsPrices,
};
