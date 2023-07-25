import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { userSchema } from "../schemas/user.schema";
import { Http } from "../../lib/http/status";
import { CustomError } from "../../lib/error/customError";

const db = [] as { name: string; email: string }[];

export class User {
  constructor() {}

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, email } = await userSchema.parseAsync(request.body);

      const user = db.find((user) => user.email === email);

      if (user) {
        return next(Http.conflict("User already exists"));
      }

      db.push({ name, email });

      const data = {
        message: "User created successfully",
      };

      return response.status(Http.OK).json(data);
    } catch (error: any) {
      if (error instanceof CustomError) {
        return next(error);
      } else if (error instanceof z.ZodError) {
        return next(
          Http.badRequest(error.errors.map((e) => e.message).join(", "))
        )
      }
      return next(Http.internalServerError(error.message));
    }
  }
}
