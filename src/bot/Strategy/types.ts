import { z } from 'zod';

import { OrderType, PositionType, SYMBOL_PAIRS, Trades } from '../common/types';

export const StrategyConfigSchema = z.object({
  symbolPair: z.enum(SYMBOL_PAIRS),
  /**
   *  Open position with relative entry amount of your balance.
   */
  entryAmountRelative: z.number().positive({ message: 'Must ba a positive number.' }),
  /**
   *  Get this info from exchange, it varies per asset.
   */
  assetDecimalPlaces: z.number().min(0).max(5),
});

export type StrategyConfig = z.infer<typeof StrategyConfigSchema>;

export type StrategyConstructor = {
  strategyConfig: StrategyConfig;
  balance_BUSD: number;
  trades: Trades;
};

type SignalPositionOpen = {
  positionType: PositionType;
  orderType: OrderType;
  quantity: number;
};
export type SearchSignalPositionOpenReturn = SignalPositionOpen | null;

export type SearchSignalPositionCloseParams = {
  positionType: PositionType;
  quantity: number;
};
type SignalPositionClose = {
  orderType: OrderType;
  quantity: number;
};
export type SearchSignalPositionCloseReturn = SignalPositionClose | null;
