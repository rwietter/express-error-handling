import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { createUserSchema } from "../schemas/user.schema";
import { Message } from "../../services/http/messages";
import { HttpStatus, HttpStatusText } from "../../services/http/status";

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
        return response.status(HttpStatus.CONFLICT).json({
          name: HttpStatusText.CONFLICT,
          message: Message.USER_EXISTS
        });
      }

      db.push({ name, email });

      return response.status(HttpStatus.CREATED).json({
        message: Message.USER_CREATED,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          name: HttpStatusText.BAD_REQUEST,
          message: error.errors.map((e) => e.message).join(", "),
        });
      }
      next(error);
    }
  }
}
