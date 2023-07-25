import {
  response,
  type NextFunction,
  type Request,
  type Response,
} from "express";

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

  return response.status(error.status || 500).json({
    success: false,
    name: error.name,
    message: error.message,
  });
};
