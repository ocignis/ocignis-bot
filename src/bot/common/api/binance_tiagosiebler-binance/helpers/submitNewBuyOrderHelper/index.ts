// https://binance-docs.github.io/apidocs/spot/en/#test-new-order-trade
//
// https://binance-docs.github.io/apidocs/spot/en/#new-order-trade

import { NewSpotOrderParams, OrderResponseFull } from 'binance';

import { binanceServiceMain } from 'bot/common/api/binance_tiagosiebler-binance';
import { logger } from 'common/utils';

import { SubmitNewBuyOrderHelper } from './types';

export const submitNewBuyOrderHelper: SubmitNewBuyOrderHelper = async ({ symbol, quantity }) => {
  const newBuyOrderParams: NewSpotOrderParams = {
    symbol,
    quantity,
    side: 'BUY',
    type: 'MARKET',
    /**
     * ACK = confirmation of order acceptance (no placement/fill information) -> OrderResponseACK
     * RESULT = fill state -> OrderResponseResult
     * FULL = fill state + detail on fills and other detail -> OrderResponseFull
     */
    newOrderRespType: 'FULL',
  };

  await binanceServiceMain.testNewOrder(newBuyOrderParams);

  // const buyOrderResponseFull = (await binanceServiceMain.submitNewOrder(newBuyOrderParams)) as OrderResponseFull;
  // @ts-expect-error Temporary mock
  const buyOrderResponseFull: OrderResponseFull = { id: 'mocked-full-response' };

  logger.info(JSON.stringify({ buyOrderResponseFull }));

  return { buyOrderResponseFull };
};
