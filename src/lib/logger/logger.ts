import path from "path";
import pino from "pino";
import pinoHttp from "pino-http";

const logPath = path.join(__dirname, "..", "..", "..", "public");

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || "info",
    transport: {
      targets: [
        {
          target: "pino-pretty",
          level: "debug",
          options: { colorize: true, colorizeObjects: true },
        },
        {
          target: "pino/file",
          level: "debug",
          options: { destination: `${logPath}/dump.log` },
        },
      ],
    },
    timestamp: pino.stdTimeFunctions.isoTime
    // ...(isProduction ? {} : options),
  },
  pino.destination(`${logPath}/dump.log`)
);

export const loggerHttpMiddleware = pinoHttp({
  logger,
});
