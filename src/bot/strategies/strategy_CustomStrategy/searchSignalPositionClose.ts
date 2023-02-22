import { crossDown, crossUp, sma } from 'technicalindicators';

import { PositionType, Trades } from 'bot/common/types';
import { SearchSignalPositionCloseReturn } from 'bot/Strategy';

type SearchSignalPositionCloseParams = {
  positionType: PositionType;
  quantity: number;
  trades: Trades;
  periodShort: number;
  periodLong: number;
};

export const searchSignalPositionClose = ({
  positionType,
  quantity,
  trades,
  periodShort,
  periodLong,
}: SearchSignalPositionCloseParams): SearchSignalPositionCloseReturn => {
  const tradesClose = trades.map((trade) => trade.price);

  const smaPeriodShort = sma({ period: periodShort, values: tradesClose });
  const smaPeriodLong = sma({ period: periodLong, values: tradesClose });

  const isComparingFromLastTradeToFirstUntilPossible = true;

  const isSearchSellLongSignal = positionType === 'long';

  let isLastCross: boolean | undefined = false;

  if (isSearchSellLongSignal) {
    const crossDownKlines = crossDown({
      lineA: smaPeriodShort,
      lineB: smaPeriodLong,
      reversedInput: isComparingFromLastTradeToFirstUntilPossible,
    });

    isLastCross = crossDownKlines.at(-1);
  }

  if (!isSearchSellLongSignal) {
    const crossUpKlines = crossUp({
      lineA: smaPeriodShort,
      lineB: smaPeriodLong,
      reversedInput: isComparingFromLastTradeToFirstUntilPossible,
    });

    isLastCross = crossUpKlines.at(-1);
  }

  if (!isLastCross) {
    return null;
  }

  const signalPositionClose: SearchSignalPositionCloseReturn = {
    orderType: 'MARKET',
    quantity,
  };

  return signalPositionClose;
};
