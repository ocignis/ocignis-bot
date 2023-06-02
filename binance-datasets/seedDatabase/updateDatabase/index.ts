import { calculateTimespan, logger } from 'common/utils';
import prisma from 'prisma/prismaClient';

import { BinanceFilesDataInfo } from '../getBinanceFilesDataInfo';

import { arrayIntoChunks } from './arrayIntoChunks';
import { databaseInsertBacktestHistoricTrades } from './databaseInsertBacktestHistoricTrades';
import { getTradesFromCsv } from './getTradesFromCsv';
import { transformTradeRowCsv } from './transformTradeRowCsv';

type UpdateDatabaseParams = { binanceFilesDataInfo: BinanceFilesDataInfo };

const MAX_RECORDS_PRISMA_INSERT = 100000;

export const updateDatabaseSequentialExecution = async ({
  binanceFilesDataInfo,
}: UpdateDatabaseParams): Promise<{ numOfDbRowsInserted: number; numOfCsvRowsParsed: number }> => {
  const numOfFilesToUpdate = binanceFilesDataInfo
    .map((binanceFileDataInfo) => binanceFileDataInfo.filesInfo.map(() => 'noopCount'))
    .flat().length;
  logger.info(`Number of CSV files to update - ${numOfFilesToUpdate}`);

  let numOfDbRowsInserted = 0;
  let numOfCsvRowsParsed = 0;
  let numOfBinanceFilesDataInfoUpdated = 0;

  for (const binanceFileDataInfo of binanceFilesDataInfo) {
    for (const { filePath, fileName } of binanceFileDataInfo.filesInfo) {
      const startTime = performance.now();

      await prisma.$connect();

      logger.info(`Progress updateDatabase - File (start): ${fileName}`);

      const csvTrades = await getTradesFromCsv({ csvFilePath: filePath });
      numOfCsvRowsParsed += csvTrades.length;

      const trades = csvTrades.map((csvTrade) =>
        transformTradeRowCsv({ symbolPair: binanceFileDataInfo.symbolPair, tradeRowCsv: csvTrade }),
      );

      const tradesChunks = arrayIntoChunks(trades, MAX_RECORDS_PRISMA_INSERT);
      logger.info(
        `Progress updateDatabase - Chunk size: ${MAX_RECORDS_PRISMA_INSERT}, Num of chunks: ${tradesChunks.length}`,
      );

      for (const [index, tradesChunk] of tradesChunks.entries()) {
        const { numOfDbRowsInserted: numOfDbRowsInsertedChunk } = await databaseInsertBacktestHistoricTrades({
          data: tradesChunk,
        });

        logger.info(`Progress updateDatabase - Chunk: ${tradesChunks.length}/${index + 1}`);

        numOfDbRowsInserted += numOfDbRowsInsertedChunk;
      }

      const endTime = performance.now();

      await prisma.backtestHistoricTradeImportedFileData.create({
        data: { name: fileName, processingTime: calculateTimespan({ startTime, endTime }) },
      });

      numOfBinanceFilesDataInfoUpdated++;

      await prisma.$disconnect();

      logger.info(
        `Progress updateDatabase - File (finished): ${fileName} - ${calculateTimespan({ startTime, endTime })}`,
      );
      logger.info(
        `Progress updateDatabase - Files processed: ${numOfFilesToUpdate}/${numOfBinanceFilesDataInfoUpdated}`,
      );
    }
  }

  return { numOfDbRowsInserted, numOfCsvRowsParsed };
};
