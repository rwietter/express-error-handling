import { Router } from "express";
import { User } from "../controllers/User/User";

export const router = Router();

const user = new User();

router.post("/", user.create);
