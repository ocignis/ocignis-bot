import { BotBacktest } from 'bot';
import { logger } from 'common/utils';

import { CustomStrategy_01 } from './configs';

const runBotBacktest = async () => {
  logger.notice(`### Run Bot Backtest - START ###`);

  try {
    const botBacktest = new BotBacktest(CustomStrategy_01);

    await botBacktest.initialize();
    const backtestInfo = botBacktest.start();

    console.log('🔎 Log ~ backtestInfo.stats', backtestInfo.stats);

    return backtestInfo;
  } catch (error) {
    const errorCasted = error as Error;

    logger.error('Top level error occurred.');
    logger.error(`Error message: ${errorCasted.message}`);
    logger.error(`Error name: ${errorCasted.name}`);
    logger.error(`Error cause: ${errorCasted.cause as string}`);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    logger.error(`Error stack: ${errorCasted.stack!}`);
  }
};

void runBotBacktest();
