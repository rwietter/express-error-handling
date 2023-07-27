import { logger } from "../logger/logger";

/**
 * Catch All Uncaught Exceptions.
 *
 * These errors can often cause issues in your apps like memory leaks and high CPU usage.
 */
export const UnhandledErrors = () => {
  process.on("unhandledRejection", (error: Error) => {
    logger.error(error);
  });

  process.on("uncaughtException", (error) => {
    logger.fatal(error, "uncaught exception detected");
    
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
