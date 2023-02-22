import {
  isWsFormattedUserDataEvent,
  WsUserDataEvents,
  isWsFormattedSpotUserDataEvent,
  isWsFormattedFuturesUserDataEvent,
  isWsFormattedTrade,
  WsMessageTradeFormatted,
} from 'binance';

import { binanceServiceWs } from 'bot/common/api/binance_tiagosiebler-binance';
import { SymbolPair } from 'bot/common/types';
import { isPaperTesting, logger } from 'common/utils';

type SubscriptionFormattedMessageParams = {
  symbolPair: SymbolPair;
  onTradeReceived: (trade: WsMessageTradeFormatted) => void;
  onUserDataReceived: (userData: WsUserDataEvents) => void;
};

export const subscriptionFormattedMessage = ({
  symbolPair,
  onTradeReceived,
  onUserDataReceived,
}: SubscriptionFormattedMessageParams) => {
  binanceServiceWs.on('formattedMessage', (data) => {
    if (isWsFormattedTrade(data)) {
      logger.info(`Formatted trade received. \n data: ${JSON.stringify(data, null, 2)}`);

      onTradeReceived(data);
      return;
    }

    if (isWsFormattedUserDataEvent(data)) {
      onUserDataEvent(data, onUserDataReceived);
      return;
    }

    logger.error(`Unhandled Formatted Message Received. \n data: ${JSON.stringify(data, null, 2)}`);
  });

  // https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-streams
  // binanceServiceWs.subscribeSpotKline(symbolPair, klineInterval);

  // https://binance-docs.github.io/apidocs/spot/en/#trade-streams
  binanceServiceWs.subscribeSpotTrades(symbolPair);

  if (!isPaperTesting()) {
    void binanceServiceWs.subscribeSpotUserDataStream();
  }
};

const onUserDataEvent = (data: WsUserDataEvents, onUserDataReceived: (userData: WsUserDataEvents) => void) => {
  if (isWsFormattedSpotUserDataEvent(data)) {
    onUserDataReceived(data);
    return;
  }
  if (data.wsMarket.includes('margin')) {
    console.log('margin user data event: ', data);
    return;
  }
  if (data.wsMarket.includes('isolatedMargin')) {
    console.log('isolatedMargin user data event: ', data);
    return;
  }
  if (data.wsMarket.includes('usdmTestnet')) {
    console.log('usdmTestnet user data event: ', data);
    return;
  }
  if (data.wsMarket.includes('coinmTestnet')) {
    console.log('coinmTestnet user data event: ', data);
    return;
  }

  if (isWsFormattedFuturesUserDataEvent(data)) {
    console.log('usdm user data event: ', data);
    return;
  }
};
