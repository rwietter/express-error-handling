import type { NextFunction, Request, Response } from "express";

interface IError extends Error {
  status: number;
}

export const errorHandler = (
  error: IError,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  return response.status(status).json({ message });
}