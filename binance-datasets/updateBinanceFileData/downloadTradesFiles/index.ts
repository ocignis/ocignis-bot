import { Stream } from 'stream';

import axios from 'axios';
import fs from 'fs-extra';

import { logger } from 'common/utils';

import { MakeTradesDataDownloadInfoReturn } from '../makeTradesDataDownloadInfo';

type DownloadTradesFilesParams = {
  tradesDataDownloadInfo: MakeTradesDataDownloadInfoReturn;
};

export const downloadTradesFiles = async ({ tradesDataDownloadInfo }: DownloadTradesFilesParams): Promise<void> => {
  let numOfTradesDataDownloadInfoCompleted = 0;

  const tradesFilePromises = tradesDataDownloadInfo.map(async ({ dataUrl, targetPath, targetFolder }) => {
    const { data: fileData } = await axios.request<Stream>({
      method: 'GET',
      url: dataUrl,
      responseType: 'stream',
    });

    await fs.ensureDir(targetFolder);

    await createFile(fileData, targetPath);

    numOfTradesDataDownloadInfoCompleted++;

    logger.info(
      `Progress downloadTradesFiles - ${tradesDataDownloadInfo.length}/${numOfTradesDataDownloadInfoCompleted}`,
    );
  });

  await Promise.all(tradesFilePromises);
};

const createFile = async (fileData: Stream, targetPath: string) => {
  return new Promise<void>((resolve) => {
    const writer = fs.createWriteStream(targetPath);

    fileData.pipe(writer);

    writer.on('finish', resolve);
  });
};
