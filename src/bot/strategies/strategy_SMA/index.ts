import { SearchSignalPositionCloseParams, Strategy, StrategyConstructor } from 'bot/Strategy';

import { searchSignalPositionClose } from './searchSignalPositionClose';
import { searchSignalPositionOpen } from './searchSignalPositionOpen';
import { Strategy_SMA_Constructor } from './types';

export class Strategy_SMA extends Strategy {
  protected readonly _strategyName = 'SMA';
  private _periodShort: number;
  private _periodLong: number;

  constructor({ periodShort, periodLong, ...rest }: StrategyConstructor & Strategy_SMA_Constructor) {
    super(rest);

    this._periodShort = periodShort;
    this._periodLong = periodLong;
  }

  searchSignalPositionOpen() {
    return searchSignalPositionOpen({
      balance_BUSD: this.balance_BUSD,
      entryAmountRelative: this._strategyConfig.entryAmountRelative,
      assetDecimalPlaces: this._strategyConfig.assetDecimalPlaces,
      trades: this.trades,
      periodShort: this._periodShort,
      periodLong: this._periodLong,
    });
  }

  searchSignalPositionClose({ positionType, quantity }: SearchSignalPositionCloseParams) {
    return searchSignalPositionClose({
      positionType,
      quantity,
      trades: this.trades,
      periodShort: this._periodShort,
      periodLong: this._periodLong,
    });
  }
}
