import { logger, calculateTimespan } from 'common/utils';

import { getBinanceFilesDataInfo } from './getBinanceFilesDataInfo';
import { removeAlreadyImportedBinanceFilesData } from './removeAlreadyImportedBinanceFilesData';
import { updateDatabaseSequentialExecution } from './updateDatabase';

const seedDatabase = async () => {
  logger.notice('### seedDatabase - START ###');
  const startTime = performance.now();

  const binanceFilesDataInfo = await getBinanceFilesDataInfo();
  const getBinanceFilesDataInfoTime = performance.now();
  logger.info(`getBinanceFilesDataInfo - ${calculateTimespan({ startTime, endTime: getBinanceFilesDataInfoTime })}`);

  const newBinanceFilesDataInfo = await removeAlreadyImportedBinanceFilesData(binanceFilesDataInfo);
  const removeAlreadyImportedBinanceFilesDataTime = performance.now();
  logger.info(
    `removeAlreadyImportedBinanceFilesDataTime - ${calculateTimespan({
      startTime,
      endTime: removeAlreadyImportedBinanceFilesDataTime,
    })}`,
  );

  const updateDatabaseInfo = await updateDatabaseSequentialExecution({ binanceFilesDataInfo: newBinanceFilesDataInfo });
  logger.info(`Number of CSV trades parsed - ${updateDatabaseInfo.numOfCsvRowsParsed}`);
  logger.info(`Number of DB trades inserted - ${updateDatabaseInfo.numOfDbRowsInserted}`);
  const updateDatabaseInfoTime = performance.now();
  logger.info(`updateDatabase - ${calculateTimespan({ startTime, endTime: updateDatabaseInfoTime })}`);

  const endTime = performance.now();
  logger.notice(`Timespan - ${calculateTimespan({ startTime, endTime })}`);
  logger.notice('### seedDatabase - END ###');
};

void seedDatabase();
