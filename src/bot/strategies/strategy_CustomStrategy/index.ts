import { SearchSignalPositionCloseParams, Strategy, StrategyConstructor } from 'bot/Strategy';

import { searchSignalPositionClose } from './searchSignalPositionClose';
import { searchSignalPositionOpen } from './searchSignalPositionOpen';
import { Strategy_CustomStrategy_Constructor } from './types';

export class Strategy_CustomStrategy extends Strategy {
  protected readonly _strategyName = 'CustomStrategy';
  private _customStrategyParam: string;
  private _periodShort: number;
  private _periodLong: number;

  constructor({
    customStrategyParam,
    periodShort,
    periodLong,
    ...rest
  }: StrategyConstructor & Strategy_CustomStrategy_Constructor) {
    super(rest);

    this._customStrategyParam = customStrategyParam;
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
      customStrategyParam: this._customStrategyParam,
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
