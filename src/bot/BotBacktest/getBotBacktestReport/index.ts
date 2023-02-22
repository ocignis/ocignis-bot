import { PositionClosed } from 'bot/common/types';
import { calculateTimespan } from 'common/utils';

import { BotBacktest } from '..';
import { BotBacktestConfig, BotBacktestFsmInitializedRunning } from '../types';

import { getBalance } from './getBalance';
import { getBotExecutionTime } from './getBotExecutionTime';
import { getMarket } from './getMarket';
import { getTradingStats } from './getTradingStats';

type GetBotBacktestReportParams = {
  strategyName: BotBacktestConfig['strategyName'];
  strategyConfig: BotBacktestConfig['strategyConfig'];
  strategySpecificConfig: BotBacktestConfig['strategySpecificConfig'];
  backtestConfig: BotBacktestConfig['backtestConfig'];
  botBacktestFsm: BotBacktestFsmInitializedRunning;
  executionTime: BotBacktest['_executionTime'];
  positionsClosed: ReadonlyArray<PositionClosed>;
  numOfTrades: number;
};

export const getBotBacktestReport = ({
  strategyName,
  strategyConfig,
  backtestConfig,
  botBacktestFsm,
  executionTime,
  positionsClosed,
  numOfTrades,
}: GetBotBacktestReportParams) => {
  const botBacktestInfo = {
    stats: {
      strategyConfig: {
        name: strategyName,
        symbolPair: strategyConfig.symbolPair,
        entryAmountRelative: `${strategyConfig.entryAmountRelative}%`,
      },
      botExecutionTime: getBotExecutionTime({ executionTime }),
      market: getMarket({ tradesDataset: botBacktestFsm.tradesDataset }),
      time: {
        start: new Date(backtestConfig.startTime),
        end: new Date(backtestConfig.endTime),
        timespan: calculateTimespan({
          startTime: backtestConfig.startTime,
          endTime: backtestConfig.endTime,
        }),
      },
      balance: getBalance({
        backtestConfigBalance_BUSD: backtestConfig.balance_BUSD,
        strategyBalance_BUSD: botBacktestFsm.strategy.balance_BUSD,
      }),
      tradingStats: getTradingStats({ positionsClosed, fee: backtestConfig.fee, numOfTrades }),
    },
    data: {
      tradesDataset: botBacktestFsm.tradesDataset,
      positionsClosed,
    },
  } as const;

  return botBacktestInfo;
};
