import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'server/rest-api/common/response/CustomError';

type ShowResponse = {
  info: string;
};

export const destroy = (_req: Request, res: Response, next: NextFunction) => {
  try {
    // delete all logs

    const showResponse: ShowResponse = {
      info: `Number of logs deleted: ${4}`,
    };

    res.customResponse<ShowResponse>({ data: showResponse });
  } catch (err) {
    const customError = new CustomError({});
    return next(customError);
  }
};
