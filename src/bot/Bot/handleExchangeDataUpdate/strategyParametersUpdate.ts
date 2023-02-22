import { WsMessageTradeFormatted } from 'binance';

import { Trade } from 'bot/common/types';
import { Strategy } from 'bot/Strategy';

type StrategyParametersUpdateParams = {
  strategy: Strategy;
  tradeWs: WsMessageTradeFormatted;
};

export const strategyParametersUpdate = ({ strategy, tradeWs }: StrategyParametersUpdateParams) => {
  const trade: Trade = {
    time: tradeWs.time,
    price: tradeWs.price,
    quantity: tradeWs.quantity,
    volume: tradeWs.price * tradeWs.quantity,
  };

  strategy.update({ newTrade: trade });
};
