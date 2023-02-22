import { getUnixTime, fromUnixTime } from 'date-fns';

import { formatDateIsoToHuman } from './formatDateIsoToHuman';

// Multiply by a factor of 1000 JS timestamps - milliseconds, as opposed to Unix timestamps - seconds.
const FACTOR_JS_UNIX_TIME = 1000;

type HumanAndIso = {
  human: string;
  iso: string;
};
export const formatDateUnixToHumanAndIso = (dateUnix: number): HumanAndIso => {
  const dateIso = fromUnixTime(dateUnix / FACTOR_JS_UNIX_TIME).toISOString();

  return {
    human: formatDateIsoToHuman(dateIso).human,
    iso: dateIso,
  };
};

export const formatDateToUnix = (date: Date | string): number => {
  const unixTime = getUnixTime(new Date(date)) * FACTOR_JS_UNIX_TIME;

  if (typeof unixTime !== 'number' || Number.isNaN(unixTime)) {
    throw Error(`Passed date is invalid - formatDateToUnix()`);
  }

  return unixTime;
};
