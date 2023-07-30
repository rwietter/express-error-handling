import * as Sentry from "@sentry/node";
import { logger } from "../logger/logger";
import { isProduction } from '../helpers/isProduction'

/**
 * Catch All Uncaught Exceptions.
 *
 * These errors can often cause issues in your apps like memory leaks and high CPU usage.
 */
export const UnhandledErrors = () => {
  process.on("unhandledRejection", (error: Error) => {
    if (isProduction()) Sentry.captureException(error);

    logger.error(error);
  });

  process.on("uncaughtException", (error) => {
    logger.fatal(error, "uncaught exception detected");

    if (isProduction()) Sentry.captureException(error);

    // exit immediately and generate a core dump file
    setTimeout(() => {
      process.abort();
    }, 1000).unref();

    process.exit(1);
  });

  process.on("warning", (warning) => {
    logger.warn(warning);
  });
};
