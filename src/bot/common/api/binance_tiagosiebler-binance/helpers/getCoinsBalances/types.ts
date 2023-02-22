import { AllCoinsInformationResponse } from 'binance';

import { SymbolCoins } from '../../../../types';

type GetCoinsBalancesParams<T> = {
  symbolCoins: T;
};
export type GetCoinsBalances = <T extends SymbolCoins>(
  params: GetCoinsBalancesParams<T>,
) => Promise<ReadonlyMap<T[number], AllCoinsInformationResponse>>;
