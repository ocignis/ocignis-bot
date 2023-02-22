import { binanceServiceMain } from 'bot/common/api/binance_tiagosiebler-binance';
import { SymbolPair, SYMBOL_PAIRS } from 'bot/common/types';

export const getBinanceApiInfoAvailableInPaperTestingAndLive = async () => {
  // https://binance-docs.github.io/apidocs/spot/en/#exchange-information
  const exchangeInfo = await binanceServiceMain.getExchangeInfo();
  const exchangeInfoTransformed = {
    _rateLimitsInfoUrl: 'https://binance-docs.github.io/apidocs/spot/en/#limits',
    ...exchangeInfo,
    symbols: exchangeInfo.symbols.filter(({ symbol }) => SYMBOL_PAIRS.includes(symbol as SymbolPair)),
  };

  return { exchangeInfo: exchangeInfoTransformed };
};
