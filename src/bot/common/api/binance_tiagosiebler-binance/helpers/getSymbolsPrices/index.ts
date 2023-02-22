// https://binance-docs.github.io/apidocs/spot/en/#symbol-price-ticker
// Weight(IP): Weight is 2 if you query for 2 or n symbol pairs

import { SymbolPrice } from 'binance';

import { binanceServiceMain } from '../..';
import { SymbolPair } from '../../../../types';

import { GetSymbolsPrices } from './types';

export const getSymbolsPrices: GetSymbolsPrices = async ({ symbols }) => {
  const symbolCoinsPrices = (await binanceServiceMain.getSymbolPriceTicker()) as ReadonlyArray<SymbolPrice>;

  const symbolCoinsPricesFiltered = symbolCoinsPrices.filter((symbolCoinPrice) =>
    symbols.includes(symbolCoinPrice.symbol as SymbolPair),
  );

  const coinBalancesTransformed = new Map(
    symbolCoinsPricesFiltered.map((symbolCoinPriceFiltered) => [
      symbolCoinPriceFiltered.symbol as SymbolPair,
      {
        price: symbolCoinPriceFiltered.price,
        symbol: symbolCoinPriceFiltered.symbol as SymbolPair,
      },
    ]),
  );

  return coinBalancesTransformed;
};
