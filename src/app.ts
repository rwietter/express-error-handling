/**
 * This is a helper function that wraps the async functions in a try/catch block
 */
require("express-async-errors");
import express from "express";

import { router } from "./routes/routes";
import { errorHandler } from "./lib/error/errorHandler";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(router)
app.use(errorHandler)
