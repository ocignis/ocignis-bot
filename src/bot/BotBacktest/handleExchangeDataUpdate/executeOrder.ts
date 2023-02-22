import { Position, Trade } from 'bot/common/types';
import { calculateRoi } from 'bot/common/utils';

import { Strategy } from '../../Strategy';
import { SearchSignalPositionOpenReturn, SearchSignalPositionCloseReturn } from '../../Strategy/types';

type ExecuteOrderParams = {
  signalPositionOpen: SearchSignalPositionOpenReturn;
  signalPositionClose: SearchSignalPositionCloseReturn;
  position: Position;
  strategy: Strategy;
  trade: Trade;
  fee: number;
};

/**
 * Backtesting executes order and trade (also sets position) based on signals.
 */
export const executeOrder = ({
  signalPositionOpen,
  signalPositionClose,
  position,
  strategy,
  trade,
  fee,
}: ExecuteOrderParams): Position | null => {
  if (signalPositionOpen) {
    // Trade executed
    const priceAmount = trade.price * signalPositionOpen.quantity;
    const feeAmount = (priceAmount * fee) / 100;
    strategy.balance_BUSD = strategy.balance_BUSD - priceAmount - feeAmount;

    if (strategy.balance_BUSD < 0) {
      throw Error('Backtesting stopped - Balance 0.');
    }

    // Set Position
    const positionOpen: Position = {
      status: 'open',
      positionType: signalPositionOpen.positionType,
      entryOrderType: signalPositionOpen.orderType,
      entryTime: trade.time,
      entryPrice: trade.price,
      entryQuantity: signalPositionOpen.quantity,
    };
    return positionOpen;
  }

  if (signalPositionClose) {
    const currentPositionCasted = position as Extract<Position, { status: 'open' }>;

    // Trade executed
    const priceAmount = trade.price * signalPositionClose.quantity;
    const feeAmount = (priceAmount * fee) / 100;
    strategy.balance_BUSD = strategy.balance_BUSD + priceAmount - feeAmount;

    // Set Position
    const roi = calculateRoi({ startValue: currentPositionCasted.entryPrice, endValue: trade.price });
    const positionClosed: Position = {
      status: 'closed',
      positionType: currentPositionCasted.positionType,
      entryOrderType: currentPositionCasted.entryOrderType,
      entryTime: currentPositionCasted.entryTime,
      entryPrice: currentPositionCasted.entryPrice,
      entryQuantity: currentPositionCasted.entryQuantity,
      exitOrderType: signalPositionClose.orderType,
      exitTime: trade.time,
      exitPrice: trade.price,
      exitQuantity: signalPositionClose.quantity,
      roiAbsolute: roi.absolute,
      roiRelative: roi.relative,
    };
    return positionClosed;
  }

  return null;
};
