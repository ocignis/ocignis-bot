import { Position } from 'bot/common/types';
import { Strategy_SMA } from 'bot/strategies';

import { getInitStrategyParameters } from './getInitStrategyParameters';
import { handleExchangeDataUpdate } from './handleExchangeDataUpdate';
import { BotCommands, BotConfig, BotConstructor, BotFsm } from './types';
import {
  subscriptionFormattedMessage,
  subscriptionsCloseConnection,
  subscriptionsGeneral,
} from './websocketsSubscriptions';

export { BotConfigSchema, BotInstanceSchema } from './types';
export type { BotConfig } from './types';

export class Bot implements BotCommands {
  private _botFsm: BotFsm;
  private _botConfig: BotConfig;
  private _position: Position = { status: 'neutral' };
  private _isProcessingExchangeDataUpdate = false;

  constructor(params: BotConstructor) {
    this._botFsm = { status: 'idle' };
    this._botConfig = params;
  }

  /**
   * Initialize bot.
   */
  public async initialize() {
    if (this._botFsm.status !== 'idle') {
      throw Error(
        `Can't execute command 'initialize()' from status '${this._botFsm.status}'. Bot must be in status 'idle'`,
      );
    }

    this._botFsm.status = 'initializing';

    const { strategyName, strategyConfig, strategySpecificConfig } = this._botConfig;

    switch (strategyName) {
      case 'SMA':
        const { balance_BUSD, trades, position } = await getInitStrategyParameters({
          symbolPair: strategyConfig.symbolPair,
        });

        this._position = position;

        const strategy_SMA = new Strategy_SMA({
          strategyConfig,
          balance_BUSD,
          trades,
          periodShort: strategySpecificConfig.periodShort,
          periodLong: strategySpecificConfig.periodShort,
        });
        this._botFsm = { status: 'initialized', strategy: strategy_SMA };
        return;

      case 'CustomStrategy':
        return;

      default:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw Error(`Unrecognized strategy name: ${strategyName}.`);
    }
  }

  /**
   * Start/subscribe to websockets.
   */
  public start(): void {
    if (this._botFsm.status !== 'initialized') {
      throw Error(
        `Can't execute command 'start()' from status '${this._botFsm.status}'. Bot must be in status 'initialized'`,
      );
    }

    const strategy_TsIssueThinksItsNull = this._botFsm.strategy;

    const { strategyConfig } = this._botConfig;

    subscriptionsGeneral();
    subscriptionFormattedMessage({
      symbolPair: strategyConfig.symbolPair,
      onTradeReceived: (tradeWs) => {
        void handleExchangeDataUpdate({
          position: this._position,
          // Pass "by reference" doesn't work here
          isProcessingExchangeDataUpdate: this._isProcessingExchangeDataUpdate,
          strategy: strategy_TsIssueThinksItsNull,
          tradeWs,
        });
      },
      onUserDataReceived: (userData) => {
        console.log('🔎 Log ~ onUserDataReceived ~ userData', userData);
        // update user balance - handleExchangeDataUpdate
      },
    });

    this._botFsm.status = 'running';
  }

  /**
   * - Stop creating new buy orders.
   * - Sell all open orders.
   * - Unsubscribe from websockets.
   */
  public stop(): void {
    if (this._botFsm.status !== 'running') {
      throw Error(
        `Can't execute command 'stop()' from status '${this._botFsm.status}'. Bot must be in status 'running'.`,
      );
    }

    this._botFsm = { status: 'stopping', strategy: this._botFsm.strategy };

    // Stop creating new buy orders.
    // Sell all open orders.

    subscriptionsCloseConnection();

    this._botFsm = { status: 'idle' };
  }

  /**
   * Get status info on bot FSM & strategy.
   */
  public status() {
    return {
      botFsm: this._botFsm.status,
      position: this._position,
      strategy: 'strategy' in this._botFsm ? this._botFsm.strategy : undefined,
    };
  }
}
