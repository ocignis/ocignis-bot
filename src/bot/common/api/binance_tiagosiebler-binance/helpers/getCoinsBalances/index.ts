// https://binance-docs.github.io/apidocs/spot/en/#all-coins-39-information-user_data
// Weight(IP): 10

import { binanceServiceMain } from '../..';
import { SymbolCoin } from '../../../../types';

import { GetCoinsBalances } from './types';

export const getCoinsBalances: GetCoinsBalances = async ({ symbolCoins }) => {
  const coinBalances = await binanceServiceMain.getBalances();

  const coinBalancesFiltered = coinBalances.filter((coinBalance) =>
    symbolCoins.includes(coinBalance.coin as SymbolCoin),
  );

  const coinBalancesTransformed = new Map(
    coinBalancesFiltered.map((coinBalanceFiltered) => [coinBalanceFiltered.coin as SymbolCoin, coinBalanceFiltered]),
  );

  return coinBalancesTransformed;
};
