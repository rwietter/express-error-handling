import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { userSchema } from "../schemas/user.schema";
import { Http } from "../../lib/http/status";
import { CustomError } from "../../lib/error/customError";

export class User {
  constructor() {}

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, email } = await userSchema.parseAsync(request.body);

      const isBodyEmpty = typeof name !== "string" || typeof email !== "string";
      const isNameOrEmailMissing = !name || !email;

      if (isBodyEmpty || isNameOrEmailMissing) {
        return next(Http.badRequest("Missing name or email"));
      }

      const data = { name, email };

      return response.status(Http.ok()).json(data);
    } catch (error: any) {
      if (error instanceof CustomError) {
        return next(error);
      } else if (error instanceof z.ZodError) {
        return next(
          Http.badRequest(error.errors.map((e) => e.message).join(", "))
        );
      }
      return next(Http.internalServerError(error.message));
    }
  }
}
