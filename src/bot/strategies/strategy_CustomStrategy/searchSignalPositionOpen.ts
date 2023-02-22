/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { crossUp, sma } from 'technicalindicators';

import { Trades } from 'bot/common/types';
import { SearchSignalPositionOpenReturn } from 'bot/Strategy';

type SearchSignalPositionOpenParams = {
  balance_BUSD: number;
  entryAmountRelative: number;
  assetDecimalPlaces: number;
  trades: Trades;
  periodShort: number;
  periodLong: number;
  customStrategyParam: string;
};

export const searchSignalPositionOpen = ({
  balance_BUSD,
  entryAmountRelative,
  assetDecimalPlaces,
  trades,
  periodShort,
  periodLong,
  customStrategyParam,
}: SearchSignalPositionOpenParams): SearchSignalPositionOpenReturn => {
  console.log('customStrategyParam: ', customStrategyParam);

  const buyAmount_BUSD = balance_BUSD * (entryAmountRelative / 100);

  const buyAmountOfCoins = Number((buyAmount_BUSD / trades.at(-1)!.price).toFixed(assetDecimalPlaces));

  const tradesClose = trades.map((trade) => trade.price);

  const smaPeriodShort = sma({ period: periodShort, values: tradesClose });
  const smaPeriodLong = sma({ period: periodLong, values: tradesClose });

  const isComparingFromLastTradeToFirstUntilPossible = true;
  const crossUpTrades = crossUp({
    lineA: smaPeriodShort,
    lineB: smaPeriodLong,
    reversedInput: isComparingFromLastTradeToFirstUntilPossible,
  });

  const isLastCrossUpTrades = crossUpTrades.at(-1);

  if (!isLastCrossUpTrades) {
    return null;
  }

  const signalBuyParametersReturn: SearchSignalPositionOpenReturn = {
    orderType: 'MARKET',
    positionType: 'long',
    quantity: buyAmountOfCoins,
  };

  return signalBuyParametersReturn;
};
