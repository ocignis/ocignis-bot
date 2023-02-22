import { isPaperTesting } from 'common/utils';

import { getBinanceApiInfoAvailableInPaperTestingAndLive } from './getBinanceApiInfoAvailableInPaperTestingAndLive';
import { getBinanceApiInfoAvailableOnlyInLive } from './getBinanceApiInfoAvailableOnlyInLive';

export const getBinanceApiInfo = async () => {
  const dataAvailableInPaperTestingAndLivePromise = getBinanceApiInfoAvailableInPaperTestingAndLive();

  if (isPaperTesting()) {
    return await dataAvailableInPaperTestingAndLivePromise;
  }

  const dataAvailableOnlyLivePromise = getBinanceApiInfoAvailableOnlyInLive();

  const [dataAvailableInPaperTestingAndLive, dataAvailableOnlyLive] = await Promise.all([
    dataAvailableInPaperTestingAndLivePromise,
    dataAvailableOnlyLivePromise,
  ]);

  return { ...dataAvailableInPaperTestingAndLive, ...dataAvailableOnlyLive };
};

// ##### Info

// Only the /api endpoints are available on the Spot Test Network (no /sapi).
// https://testnet.binance.vision/
