import 'winston-daily-rotate-file';

import { createLogger, format, transports } from 'winston';

const logger = (fileName: string = "application") => {
  const fileLogTransport = new transports.DailyRotateFile({
    level: process.env.LOG_LEVEL || "info",
    filename: `logs/${fileName}-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "90d",
  });

  const consoleTransport = new transports.Console({
    level: process.env.LOG_LEVEL || "info",
    handleExceptions: false,
    format: format.printf((i) => `${i.message}`),
  });

  const logger = createLogger({
    level: "info",
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      format.errors({ stack: true }),
      format.printf(
        ({ level, message, label = process.env.NODE_ENV, timestamp }) =>
          `${timestamp} [${label}] ${level}: ${message}`
      )
    ),
    defaultMeta: { service: "chefs-diary" },
    transports: [consoleTransport],
  });

  if (process.env.NODE_ENV === "development") {
    logger.add(fileLogTransport);
  }

  return logger;
};

export default logger();
