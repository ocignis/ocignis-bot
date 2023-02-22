import { binanceHelpers } from 'bot/common/api/binance_tiagosiebler-binance/helpers';

import { GetCoinsBalancesHelper } from './types';

export const getCoinsBalancesHelper: GetCoinsBalancesHelper = async () => {
  const coinsBalances = await binanceHelpers.getCoinsBalances({ symbolCoins: ['BUSD', 'USDT', 'SOL'] });

  const balance_BUSD = coinsBalances.get('BUSD');
  if (!balance_BUSD) {
    throw Error('Error: No funds available to trade from BUSD.');
  }

  const balance_BUSD_Available = balance_BUSD.free;
  if (!balance_BUSD_Available) {
    throw Error(`Error: No funds available to trade from ${balance_BUSD.coin}.`);
  }
  const balance_BUSD_FreeTransformed = Number(balance_BUSD_Available);

  return {
    balance_BUSD: balance_BUSD_FreeTransformed,
  };
};
