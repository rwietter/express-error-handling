import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod";
import { Http } from "./http/status";

export const validate = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error: any) {
      return next(Http.internalServerError(error.message));
    }
};