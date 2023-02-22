/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { binanceServiceWs } from 'bot/common/api/binance_tiagosiebler-binance';
import { logger } from 'common/utils';

let wsKey: string;

export const subscriptionsGeneral = () => {
  binanceServiceWs.on('open', (data) => {
    wsKey = data.wsKey;

    logger.info(
      `Websocket Connection Opened. \n data.wsKey: ${data.wsKey} \n data.ws.target.url: ${
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        data.ws.target.url
      } \n data.ws: ${'select desired WS object field'} \n data.event: ${data.event}`,
    );
  });

  binanceServiceWs.on('error', (data) => {
    logger.error(
      `WebSocket Error. \n data.wsKey: ${data.wsKey} \n data.error: ${data.error} \n data.rawEvent: ${data.rawEvent}`,
    );
  });

  binanceServiceWs.on('reconnecting', (data) => {
    logger.info(`WebSocket automatically reconnecting.... \n data.wsKey: ${data.wsKey}`);
  });

  binanceServiceWs.on('reconnected', (data) => {
    logger.info(`WebSocket has reconnected. \n data.wsKey: ${data.wsKey}`);
  });
};

export const subscriptionsCloseConnection = () => {
  binanceServiceWs.close(wsKey, false);
};
