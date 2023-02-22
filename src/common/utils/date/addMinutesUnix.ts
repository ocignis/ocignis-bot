import { addMinutes } from 'date-fns';

import { formatDateToUnix } from './formatDate';

export const addMinutesUnix = (dateUnix: number, amount: number): number => {
  return formatDateToUnix(addMinutes(dateUnix, amount).toISOString());
};
