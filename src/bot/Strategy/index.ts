import { StrategyName } from 'bot/strategies';

import { Trade, Trades } from '../common/types';

import {
  SearchSignalPositionCloseReturn,
  SearchSignalPositionOpenReturn,
  SearchSignalPositionCloseParams,
  StrategyConfig,
  StrategyConstructor,
} from './types';

export { StrategyConfigSchema } from './types';
export type {
  StrategyConfig,
  SearchSignalPositionOpenReturn,
  SearchSignalPositionCloseReturn,
  SearchSignalPositionCloseParams,
  StrategyConstructor,
} from './types';

export abstract class Strategy {
  private readonly MAX_TRADES_IN_BUFFER = 1000;

  protected abstract readonly _strategyName: StrategyName;
  protected _strategyConfig: StrategyConfig;
  private _balance_BUSD: number;
  private _trades: Trades;

  constructor({ strategyConfig, balance_BUSD, trades }: StrategyConstructor) {
    this._strategyConfig = strategyConfig;
    this._balance_BUSD = balance_BUSD;
    this._trades = trades;
  }

  /**
   * Latest trades are added at the end of the array.
   */
  public get trades() {
    return this._trades;
  }

  public get balance_BUSD() {
    return this._balance_BUSD;
  }

  public set balance_BUSD(value: number) {
    this._balance_BUSD = value;
  }

  public update({ newTrade }: { newTrade: Trade }): void {
    this._trades.push(newTrade);

    if (this._trades.length <= this.MAX_TRADES_IN_BUFFER) {
      return;
    }

    this._trades.shift();
  }

  public abstract searchSignalPositionOpen(): SearchSignalPositionOpenReturn;

  public abstract searchSignalPositionClose(params: SearchSignalPositionCloseParams): SearchSignalPositionCloseReturn;
}
