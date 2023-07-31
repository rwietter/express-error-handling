import * as Sentry from "@sentry/node";
import type { NextFunction, Request, Response } from "express";
import { logger } from "../logger/logger";
import { isProduction } from '../helpers/isProduction'
import { HttpStatus, HttpStatusText } from "../../services/http/status";

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (isProduction()) Sentry.captureException(error);

  logger.error(error);

  return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    name: HttpStatusText.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error'
  });
};
