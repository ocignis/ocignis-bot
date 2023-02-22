import { SymbolPrice } from 'binance';

import { SymbolPair, SymbolPairs } from '../../../../types';

type GetSymbolsPricesParams<T> = {
  symbols: T;
};
type GetSymbolsPricesReturn<T extends SymbolPairs> = ReadonlyMap<
  T[number],
  Omit<SymbolPrice, 'symbol'> & { symbol: SymbolPair }
>;

export type GetSymbolsPrices = <T extends SymbolPairs>(
  params: GetSymbolsPricesParams<T>,
) => Promise<GetSymbolsPricesReturn<T>>;
