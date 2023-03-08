import AdmZip from 'adm-zip';
import fs from 'fs-extra';

import { logger } from 'common/utils';

import { MakeTradesDataDownloadInfoReturn } from '../makeTradesDataDownloadInfo';

type UnzipTradesFilesParams = {
  tradesDataDownloadInfo: MakeTradesDataDownloadInfoReturn;
};

export const unzipTradesFiles = async ({ tradesDataDownloadInfo }: UnzipTradesFilesParams): Promise<void> => {
  let numOfTradesDataDownloadInfoUnzipped = 0;

  const tradesFilePromises = tradesDataDownloadInfo.map(async ({ targetPath, targetFolder }) => {
    const admZip = new AdmZip(targetPath);

    admZip.extractAllTo(targetFolder, true);

    await fs.remove(targetPath);

    numOfTradesDataDownloadInfoUnzipped++;

    logger.info(`Progress unzipTradesFiles - ${tradesDataDownloadInfo.length}/${numOfTradesDataDownloadInfoUnzipped}`);
  });

  await Promise.all(tradesFilePromises);
};
