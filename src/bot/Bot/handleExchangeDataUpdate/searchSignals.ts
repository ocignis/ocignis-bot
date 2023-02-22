import { Position } from 'bot/common/types';
import { SearchSignalPositionCloseReturn, SearchSignalPositionOpenReturn, Strategy } from 'bot/Strategy';

type SearchSignalsParams = {
  position: Position;
  strategy: Strategy;
};
type SearchSignalsReturn = {
  signalPositionOpen: SearchSignalPositionOpenReturn;
  signalPositionClose: SearchSignalPositionCloseReturn;
};

/**
 * If position is already opened, it will not search for open signal (will not add assets).
 */
export const searchSignals = ({ position, strategy }: SearchSignalsParams): SearchSignalsReturn => {
  switch (position.status) {
    case 'neutral':
      const signalPositionOpen = strategy.searchSignalPositionOpen();

      return {
        signalPositionOpen,
        signalPositionClose: null,
      };

    case 'open':
      const signalPositionClose = strategy.searchSignalPositionClose({
        positionType: position.positionType,
        quantity: position.entryQuantity,
      });

      return {
        signalPositionOpen: null,
        signalPositionClose,
      };

    default:
      throw Error(`Error: Position with status ${position.status}, should not happen.`);
  }
};
