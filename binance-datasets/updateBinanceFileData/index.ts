import { logger, calculateTimespan } from 'common/utils';

import { DOWNLOAD_SYMBOL_PAIRS } from './DOWNLOAD_SYMBOL_PAIRS';
import { downloadTradesFiles } from './downloadTradesFiles';
import { initRootFolder } from './initRootFolder';
import { makeTradesDataDownloadInfo } from './makeTradesDataDownloadInfo';
import { unzipTradesFiles } from './unzipTradesFiles';

const updateBinanceFileData = async () => {
  logger.notice('### updateBinanceFileData - START ###');
  const startTime = performance.now();

  await initRootFolder();
  const initRootFolderTime = performance.now();
  logger.info(`initRootFolder - ${calculateTimespan({ startTime, endTime: initRootFolderTime })}`);

  const tradesDataDownloadInfo = makeTradesDataDownloadInfo({ downloadSymbolPairs: DOWNLOAD_SYMBOL_PAIRS });
  const makeTradesDataDownloadInfoTime = performance.now();
  logger.info(
    `makeTradesDataDownloadInfo - ${calculateTimespan({
      startTime: initRootFolderTime,
      endTime: makeTradesDataDownloadInfoTime,
    })}`,
  );

  await downloadTradesFiles({ tradesDataDownloadInfo });
  const downloadTradesFilesTime = performance.now();
  logger.info(
    `downloadTradesFiles - ${calculateTimespan({
      startTime: makeTradesDataDownloadInfoTime,
      endTime: downloadTradesFilesTime,
    })}`,
  );

  await unzipTradesFiles({ tradesDataDownloadInfo });
  const unzipTradesFilesTime = performance.now();
  logger.info(
    `unzipTradesFiles - ${calculateTimespan({ startTime: downloadTradesFilesTime, endTime: unzipTradesFilesTime })}`,
  );

  const endTime = performance.now();
  logger.notice(`Timespan - ${calculateTimespan({ startTime, endTime })}`);
  logger.notice('### updateBinanceFileData - END ###');
};

void updateBinanceFileData();
