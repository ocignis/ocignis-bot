import { Position, Trade } from 'bot/common/types';
import { Strategy } from 'bot/Strategy';

import { executeOrder } from './executeOrder';
import { searchSignals } from './searchSignals';

type HandleStrategyParametersUpdateParams = {
  position: Position;
  strategy: Strategy;
  trade: Trade;
  fee: number;
};

export const handleExchangeDataUpdate = ({ position, strategy, trade, fee }: HandleStrategyParametersUpdateParams) => {
  strategy.update({ newTrade: trade });

  const { signalPositionOpen, signalPositionClose } = searchSignals({ position, strategy });

  const positionNext = executeOrder({
    signalPositionOpen,
    signalPositionClose,
    position,
    strategy,
    trade,
    fee,
  });
  return positionNext;
};
