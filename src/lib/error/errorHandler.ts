import * as Sentry from "@sentry/node";
import type { NextFunction, Request, Response } from "express";
import { logger } from "../logger/logger";
import { isProduction } from '../helpers/isProduction'
import { Http } from "../../services/http/status";

interface IError extends Error {
  status: number;
}

export const errorHandler = (
  error: IError,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (isProduction() && error?.status === Http.INTERNAL_SERVER_ERROR) {
    Sentry.captureException(error);
  }

  logger.error(error);

  return response.status(error.status || 500).json({
    success: false,
    name: error.name,
    message: error.message,
  });
};
