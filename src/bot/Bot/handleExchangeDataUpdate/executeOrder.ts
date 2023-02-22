import { SearchSignalPositionOpenReturn, SearchSignalPositionCloseReturn } from 'bot/Strategy';
import { sleep } from 'common/utils';

type ExecuteOrderParams = {
  signalPositionOpen: SearchSignalPositionOpenReturn;
  signalPositionClose: SearchSignalPositionCloseReturn;
};

/**
 * Execute order based on signals.
 */
export const executeOrder = async ({ signalPositionOpen, signalPositionClose }: ExecuteOrderParams) => {
  if (signalPositionOpen) {
    await sleep(3000);
    // buy order executed
  }

  if (signalPositionClose) {
    await sleep(3000);
    // sell order executed
  }
};
