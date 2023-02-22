import { Request, Response } from 'express';

import { logger } from 'common/utils';

export const triggerAll = (_req: Request, res: Response) => {
  logger.error('This is an error log');
  logger.warn('This is a warn log');
  logger.info('This is a info log');
  logger.http('This is a http log');
  logger.debug('This is a debug log');

  res.customResponse({ message: 'All logs triggered!' });
};
