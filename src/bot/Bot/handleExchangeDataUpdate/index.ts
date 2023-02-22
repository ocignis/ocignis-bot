import { WsMessageTradeFormatted } from 'binance';

import { Position } from 'bot/common/types';
import { Strategy } from 'bot/Strategy';

import { executeOrder } from './executeOrder';
import { searchSignals } from './searchSignals';
import { strategyParametersUpdate } from './strategyParametersUpdate';

type HandleStrategyParametersUpdateParams = {
  position: Position;
  isProcessingExchangeDataUpdate: boolean;
  strategy: Strategy;
  tradeWs: WsMessageTradeFormatted;
};

export const handleExchangeDataUpdate = async ({
  position,
  isProcessingExchangeDataUpdate,
  strategy,
  tradeWs,
}: HandleStrategyParametersUpdateParams) => {
  strategyParametersUpdate({ strategy, tradeWs });

  if (isProcessingExchangeDataUpdate) {
    return;
  }

  const { signalPositionOpen, signalPositionClose } = searchSignals({ position, strategy });

  isProcessingExchangeDataUpdate = true;
  await executeOrder({ signalPositionOpen, signalPositionClose });
  isProcessingExchangeDataUpdate = false;
};
