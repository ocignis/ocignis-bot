import { addColors, createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const levelsCustom = {
  error: 0,
  warn: 1,
  info: 2,
  notice: 3,
  http: 4,
  debug: 5,
} as const;

const colorsCustom = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  notice: 'blue',
  http: 'magenta',
  debug: 'white',
} as const;

addColors(colorsCustom);

const formatCustomCommon = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf((info) => `${info.timestamp as string} - ${info.level}:\t ${info.message as string}`),
);
const formatCustomConsole = format.combine(formatCustomCommon, format.colorize({ all: true }));
const formatCustomFile = format.combine(formatCustomCommon, format.prettyPrint());

const transportsCustom = [
  new transports.Console({ format: formatCustomConsole }),
  new transports.DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '2d',
    level: 'error',
    format: formatCustomFile,
  }),
  new transports.DailyRotateFile({
    filename: 'logs/all-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '2d',
    format: formatCustomFile,
  }),
];

export const logger = createLogger({
  level: 'debug',
  levels: levelsCustom,
  transports: transportsCustom,
});
