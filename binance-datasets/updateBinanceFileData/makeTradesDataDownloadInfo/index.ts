import { BASE_PATH_DATASET_TRADES } from '../../consts';

import { DownloadSymbolPairs } from './types';

export type { DownloadSymbolPairs } from './types';

type MakeTradesDataDownloadInfoParams = {
  downloadSymbolPairs: DownloadSymbolPairs;
};

export type MakeTradesDataDownloadInfoReturn = ReadonlyArray<{
  dataUrl: string;
  targetPath: string;
  targetFolder: string;
}>;

const BASE_URL = 'https://data.binance.vision/data/spot/monthly/trades';

export const makeTradesDataDownloadInfo = ({
  downloadSymbolPairs,
}: MakeTradesDataDownloadInfoParams): MakeTradesDataDownloadInfoReturn => {
  const dataUrlsNested = downloadSymbolPairs.map(({ symbolPair, dataTimeSpans }) =>
    dataTimeSpans.map(({ year, months }) =>
      months.map((month) => {
        const dataFileName = `${symbolPair}-trades-${year}-${month}.zip`;

        const dataUrl = `${BASE_URL}/${symbolPair}/${dataFileName}`;

        const targetPath = `${BASE_PATH_DATASET_TRADES}/${symbolPair}/${dataFileName}`;

        const targetFolder = `${BASE_PATH_DATASET_TRADES}/${symbolPair}`;

        return { dataUrl, targetPath, targetFolder };
      }),
    ),
  );

  const dataUrls = dataUrlsNested.flat(3);

  return dataUrls;
};
