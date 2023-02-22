/* eslint-disable */

import { logger } from '../../../common/utils/logger';

export const outgoingRequestLogger = (httpModule: any) => {
  const original = httpModule.request;
  //@ts-expect-error don't check params
  httpModule.request = function (options, callback) {
    const url = options.href ?? `${options.proto}://${options.host}${options.path}`;
    logger.http(`Outgoing request:  ${options.method} ${url}`);
    return original(options, callback);
  };
};
