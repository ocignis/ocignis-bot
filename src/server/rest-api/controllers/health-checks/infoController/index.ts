import { Request, Response, NextFunction } from 'express';

import { ERROR_TOP_LEVEL } from 'index';
import { CustomError } from 'server/rest-api/common/response/CustomError';

export const infoController = (_req: Request, res: Response, next: NextFunction) => {
  try {
    if (ERROR_TOP_LEVEL !== null) {
      res.set('Cache-Control', 'no-store');
      res.customResponse({
        httpStatusCode: 470,
        data: {
          status: 'NOT OK',
          errorMessage: ERROR_TOP_LEVEL.message,
          errorName: ERROR_TOP_LEVEL.name,
          errorCause: ERROR_TOP_LEVEL.cause,
          errorStack: ERROR_TOP_LEVEL.stack,
        },
      });
      return;
    }

    res.set('Cache-Control', 'no-store');
    res.customResponse({
      data: {
        status: 'OK',
        databaseStatus: 'OK',
      },
    });
  } catch (err) {
    const customError = new CustomError({ errorMessage: (err as Error).message, errorRaw: err });
    return next(customError);
  }
};
