import { Position } from 'bot/common/types';
import { Strategy_CustomStrategy } from 'bot/strategies';
import { Strategy_SMA } from 'bot/strategies/strategy_SMA';

import { getBotBacktestReport } from './getBotBacktestReport';
import { getTradesFromLocal } from './getTradesFromLocal';
import { handleExchangeDataUpdate } from './handleExchangeDataUpdate';
import { BotBacktestCommands, BotBacktestConstructor, BotBacktestFsm, BotBacktestConfig } from './types';

export { BotBacktestConfigSchema, BotBacktestInstanceSchema } from './types';
export type { BotBacktestConfig } from './types';

export class BotBacktest implements BotBacktestCommands {
  private _botBacktestFsm: BotBacktestFsm;
  private _botBacktestConfig: BotBacktestConfig;
  private _position: Position = { status: 'neutral' };
  private _numOfTrades = 0;
  private _executionTime = { initialize: 0, start: 0, end: 0 };

  constructor(params: BotBacktestConstructor) {
    this._botBacktestFsm = { status: 'idle' };
    this._botBacktestConfig = params;
  }

  public async initialize() {
    this._executionTime.initialize = performance.now();

    if (this._botBacktestFsm.status !== 'idle') {
      throw Error(
        `Can't execute command 'initialize()' from status '${this._botBacktestFsm.status}'. Bot must be in status 'idle'`,
      );
    }

    this._botBacktestFsm = { status: 'initializing' };

    const { strategyName, strategyConfig, strategySpecificConfig, backtestConfig } = this._botBacktestConfig;

    const PREFETCH_TRADES = 1000;

    switch (strategyName) {
      case 'SMA': {
        const trades = await getTradesFromLocal({
          symbolPair: strategyConfig.symbolPair,
          startTime: backtestConfig.startTime,
          endTime: backtestConfig.endTime,
        });

        const firstItemsInTradesArray = trades.slice(0, PREFETCH_TRADES);
        const strategy_SMA = new Strategy_SMA({
          strategyConfig,
          balance_BUSD: backtestConfig.balance_BUSD,
          trades: firstItemsInTradesArray,
          periodShort: strategySpecificConfig.periodShort,
          periodLong: strategySpecificConfig.periodLong,
        });

        this._botBacktestFsm = {
          status: 'initialized',
          strategy: strategy_SMA,
          tradesDataset: trades.slice(PREFETCH_TRADES),
        };
        return;
      }

      case 'CustomStrategy': {
        const trades = await getTradesFromLocal({
          symbolPair: strategyConfig.symbolPair,
          startTime: backtestConfig.startTime,
          endTime: backtestConfig.endTime,
        });

        const firstItemsInTradesArray = trades.slice(0, PREFETCH_TRADES);
        const strategy_SMA = new Strategy_CustomStrategy({
          strategyConfig,
          balance_BUSD: backtestConfig.balance_BUSD,
          trades: firstItemsInTradesArray,
          isShortingEnabled: strategySpecificConfig.isShortingEnabled,
        });

        this._botBacktestFsm = {
          status: 'initialized',
          strategy: strategy_SMA,
          tradesDataset: trades.slice(PREFETCH_TRADES),
        };

        return;
      }

      default:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw Error(`Unrecognized strategy name: ${strategyName}.`);
    }
  }

  public start() {
    this._executionTime.start = performance.now();

    if (this._botBacktestFsm.status !== 'initialized') {
      throw Error(
        `Can't execute command 'start()' from status '${this._botBacktestFsm.status}'. Bot must be in status 'initialized'`,
      );
    }

    this._botBacktestFsm.status = 'running';

    const strategy_TsIssueThinksItsNull = this._botBacktestFsm.strategy;

    const { strategyName, strategyConfig, strategySpecificConfig, backtestConfig } = this._botBacktestConfig;

    const positionsClosedUnfiltered = this._botBacktestFsm.tradesDataset.map((trade) => {
      const positionNext = handleExchangeDataUpdate({
        position: this._position,
        strategy: strategy_TsIssueThinksItsNull,
        trade,
        fee: backtestConfig.fee,
      });

      const isUnchangedPositionStatus = positionNext === null;
      if (isUnchangedPositionStatus) {
        return null;
      }

      this._numOfTrades++;

      switch (positionNext.status) {
        case 'open':
          this._position = positionNext;
          return null;

        case 'closed':
          this._position.status = 'neutral';
          return positionNext;

        default:
          throw Error(`Error: Position with status ${positionNext.status}, should not happen.`);
      }
    });
    const positionsClosed = positionsClosedUnfiltered.flatMap((positionClosedUnfiltered) =>
      positionClosedUnfiltered ? [positionClosedUnfiltered] : [],
    );

    this._executionTime.end = performance.now();

    const botBacktestInfo = getBotBacktestReport({
      strategyName,
      strategyConfig,
      strategySpecificConfig,
      backtestConfig,
      botBacktestFsm: this._botBacktestFsm,
      executionTime: this._executionTime,
      positionsClosed,
      numOfTrades: this._numOfTrades,
    });

    return botBacktestInfo;
  }
}
