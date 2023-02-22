import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'server/rest-api/common/response/CustomError';

type LogType = 'all' | 'error';

type ShowParams = {
  logType: LogType;
  logDate?: string;
};

type ShowResponse = {
  logType: LogType;
  logDate: string;
  log: string;
};

export const show = (req: Request<ShowParams>, res: Response, next: NextFunction) => {
  const { logType, logDate } = req.params;

  try {
    const showResponse: ShowResponse = {
      logType,
      logDate: logDate ?? 'Log date was not provided, returning the latest log.',
      log: 'Log...',
    };

    res.customResponse<ShowResponse>({ data: showResponse });
  } catch (err) {
    const customError = new CustomError({
      errorMessage: 'Something went wrong when trying to read the log',
      errorRaw: err,
    });
    return next(customError);
  }
};
