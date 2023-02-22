import { getCoinsBalancesHelper } from 'bot/common/api/binance_tiagosiebler-binance/helpers/getCoinsBalancesHelper';
import { GetCoinsBalancesHelperReturn } from 'bot/common/api/binance_tiagosiebler-binance/helpers/getCoinsBalancesHelper/types';
import { getTrades } from 'bot/common/api/binance_tiagosiebler-binance/helpers/getTrades';
import { Position, SymbolPair, Trades } from 'bot/common/types';
import { isPaperTesting } from 'common/utils';

type GetInitStrategyParametersParams = {
  symbolPair: SymbolPair;
};

export const getInitStrategyParameters = async ({ symbolPair }: GetInitStrategyParametersParams) => {
  const balances: GetCoinsBalancesHelperReturn = isPaperTesting()
    ? { balance_BUSD: 3000 }
    : await getCoinsBalancesHelper();

  const tradesFromApi = await getTrades({ symbolPair });

  const trades: Trades = tradesFromApi.map((tradeFromApi) => ({
    time: tradeFromApi.time,
    price: tradeFromApi.price,
    quantity: tradeFromApi.quantity,
    volume: tradeFromApi.price * tradeFromApi.quantity,
  }));

  // When rerunning a bot check if there is any SymbolPair to sell (bot could crash after buy) and re-initialize open position.
  // const position: Position = {
  //   status: 'open',
  // };
  const position: Position = { status: 'neutral' };

  return {
    position,
    balance_BUSD: balances.balance_BUSD,
    trades,
  };
};
