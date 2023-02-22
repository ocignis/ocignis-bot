import { runBot } from 'bot/run/bot';
import { logger } from 'common/utils';
import { initWebServer } from 'server/initWebServer';

export let ERROR_TOP_LEVEL: Error | null = null;

const main = async () => {
  try {
    logger.notice('### main() - START ###');

    ERROR_TOP_LEVEL = null;

    await initWebServer();
    logger.notice('initWebServer() - Executed');

    // In production run bot through Web App/API
    if (process.env.NODE_ENV !== 'production') {
      await runBot();
      logger.notice(`runBot() - Executed`);
    }

    logger.notice('### main() - END ###');
  } catch (error) {
    const errorCasted = error as Error;

    logger.error('Top level error occurred.');
    logger.error(`Error message: ${errorCasted.message}`);
    logger.error(`Error name: ${errorCasted.name}`);
    logger.error(`Error cause: ${errorCasted.cause as string}`);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    logger.error(`Error stack: ${errorCasted.stack!}`);

    ERROR_TOP_LEVEL = errorCasted;
  }
};

void main();
