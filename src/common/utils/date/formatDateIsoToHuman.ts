import { format } from 'date-fns';

const FORMAT_DATE_TIME_HUMAN = 'yyyy-MM-dd HH:mm:ss.SSS xxx';

export const formatDateIsoToHuman = (dateIso: string) => {
  const humanLocal = format(new Date(dateIso), FORMAT_DATE_TIME_HUMAN);

  const human = `${dateIso.substring(0, 10)} ${dateIso.substring(11, 23)}`;

  return {
    human,
    humanLocal,
  };
};
