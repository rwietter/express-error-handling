import type { NextFunction, Request, Response } from "express";
import { logger } from "../logger/logger";

interface IError extends Error {
  status: number;
}

export const errorHandler = (
  error: IError,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (response.headersSent) {
    return next(error);
  }

  logger.error(error);

  return response.status(error.status || 500).json({
    success: false,
    name: error.name,
    message: error.message,
  });
};
