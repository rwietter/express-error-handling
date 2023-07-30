import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { createUserSchema } from "../schemas/user.schema";
import { Http } from "../../services/http/status";

type DB = {
  name: string;
  email: string;
};

const db: DB[] = [];

export class User {
  constructor() {}

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, email } = createUserSchema.parse(request.body);

      const user = db.find((user) => {
        return user.email === email;
      });

      if (user) {
        return response.status(Http.CONFLICT).json({
          message: "User already exists",
        });
      }

      db.push({ name, email });

      return response.status(Http.OK).json(db);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return next(
          Http.badRequest(error.errors.map((e) => e.message).join(", "))
        );
      }
      return next(Http.internalServerError(error.message));
    }
  }
}
