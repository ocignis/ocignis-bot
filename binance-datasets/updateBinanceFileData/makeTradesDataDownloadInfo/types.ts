import { SymbolPair } from 'bot/common/types';

type DownloadSymbolPair_AVAXBUSD = {
  symbolPair: Extract<SymbolPair, 'AVAXBUSD'>;
  dataTimeSpans: ReadonlyArray<
    | {
        year: '2023';
        months: ReadonlyArray<'01' | '02'>;
      }
    | {
        year: '2022';
        months: ReadonlyArray<'01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'>;
      }
    | {
        year: '2021';
        months: ReadonlyArray<'01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'>;
      }
    | {
        year: '2020';
        months: ReadonlyArray<'09' | '10' | '11' | '12'>;
      }
  >;
};

type DownloadSymbolPair_MATICBUSD = {
  symbolPair: Extract<SymbolPair, 'MATICBUSD'>;
  dataTimeSpans: ReadonlyArray<
    | {
        year: '2022';
        months: ReadonlyArray<'01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11'>;
      }
    | {
        year: '2021';
        months: ReadonlyArray<'01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'>;
      }
    | {
        year: '2020';
        months: ReadonlyArray<'05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'>;
      }
  >;
};

export type DownloadSymbolPairs = ReadonlyArray<DownloadSymbolPair_AVAXBUSD | DownloadSymbolPair_MATICBUSD>;
