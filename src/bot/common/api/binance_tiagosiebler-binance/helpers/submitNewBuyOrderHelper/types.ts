import { OrderResponseFull } from 'binance';

import { SymbolPair } from 'bot/common/types';

type SubmitNewBuyOrderHelperParams = {
  symbol: SymbolPair;
  quantity: number;
};

type SubmitNewBuyOrderHelperReturn = {
  buyOrderResponseFull: OrderResponseFull;
};

export type SubmitNewBuyOrderHelper = (params: SubmitNewBuyOrderHelperParams) => Promise<SubmitNewBuyOrderHelperReturn>;
