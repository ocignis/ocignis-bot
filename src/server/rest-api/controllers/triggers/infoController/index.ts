import { Request, Response, NextFunction } from 'express';

import { isPaperTesting } from 'common/utils';
import { CustomError } from 'server/rest-api/common/response/CustomError';

import { getBinanceApiInfo } from './getBinanceApiInfo';

const PAPER_TESTING_MESSAGE = 'Note: Some Binance endpoints are not available in paper testing mode.';

export const infoController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const binanceApiInfo = await getBinanceApiInfo();

    const data = {
      processEnv: {
        NODE_ENV: process.env.NODE_ENV,
      },
      binanceApiInfo,
    };

    return res.customResponse({ message: isPaperTesting() ? PAPER_TESTING_MESSAGE : undefined, data });
  } catch (err) {
    const customError = new CustomError({ errorMessage: (err as Error).message, errorRaw: err });
    return next(customError);
  }
};
