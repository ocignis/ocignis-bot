import { DownloadSymbolPairs } from './makeTradesDataDownloadInfo';

export const DOWNLOAD_SYMBOL_PAIRS: DownloadSymbolPairs = [
  {
    symbolPair: 'AVAXBUSD',
    dataTimeSpans: [
      {
        year: '2023',
        months: ['04'],
        // months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      },
      // {
      //   year: '2021',
      //   months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      // },
      // {
      //   year: '2020',
      //   months: ['09', '10', '11', '12'],
      // },
    ],
  },
  {
    symbolPair: 'MATICBUSD',
    dataTimeSpans: [
      {
        year: '2023',
        months: ['04'],
        // months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
      },
    ],
  },
];
