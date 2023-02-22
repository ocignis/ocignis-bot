import { MainClient, USDMClient, CoinMClient, WebsocketClient } from 'binance';

import { isPaperTesting } from 'common/utils';

// Testnet
export const binanceServiceMain = isPaperTesting()
  ? // Testnet
    new MainClient({
      api_key: process.env.BINANCE_API_KEY_TESTNET,
      api_secret: process.env.BINANCE_API_SECRET_TESTNET,
      baseUrl: 'https://testnet.binance.vision',
    })
  : // Mainnet
    new MainClient({
      api_key: process.env.BINANCE_API_KEY,
      api_secret: process.env.BINANCE_API_SECRET,
    });

export const binanceServiceUsdm = new USDMClient({
  api_key: process.env.BINANCE_API_KEY,
  api_secret: process.env.BINANCE_API_SECRET,
});

export const binanceServiceCoinM = new CoinMClient({
  api_key: process.env.BINANCE_API_KEY,
  api_secret: process.env.BINANCE_API_SECRET,
});

// Testnet
export const binanceServiceWs = isPaperTesting()
  ? // Testnet
    new WebsocketClient({
      api_key: process.env.BINANCE_API_KEY_TESTNET,
      api_secret: process.env.BINANCE_API_SECRET_TESTNET,
      beautify: true,
      wsUrl: 'wss://testnet.binance.vision',
    })
  : // Mainnet
    new WebsocketClient({
      api_key: process.env.BINANCE_API_KEY,
      api_secret: process.env.BINANCE_API_SECRET,
      beautify: true,
    });
