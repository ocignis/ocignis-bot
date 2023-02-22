import { Request, Response, NextFunction } from 'express';

import { Bot } from 'bot';
import { SMA_01 } from 'bot/run/bot/configs';
import { CustomError } from 'server/rest-api/common/response/CustomError';

type ControllerReqParams = {
  botCommand: 'init-start' | 'stop' | 'status';
};

const bot = new Bot(SMA_01);

export const bot_SMA_Controller = async (req: Request<ControllerReqParams>, res: Response, next: NextFunction) => {
  const { botCommand } = req.params;

  try {
    switch (botCommand) {
      case 'init-start':
        await bot.initialize();
        bot.start();

        return res.customResponse({
          message: 'Bot initialized & started.',
        });

      case 'stop':
        bot.stop();

        return res.customResponse({
          message: 'Stop command executed.',
        });

      case 'status':
        const data = bot.status();

        return res.customResponse({ message: 'Bot status', data });

      default:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw Error(`Unrecognized bot command: ${botCommand}.`);
    }
  } catch (err) {
    const customError = new CustomError({ errorMessage: (err as Error).message, errorRaw: err });
    return next(customError);
  }
};
