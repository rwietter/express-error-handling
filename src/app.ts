/**
 * This is a helper function that wraps the async functions in a try/catch block
 */
require("express-async-errors");
import './lib/config/dotenv';
import express from "express";

import { router } from "./routes/routes";
import { errorHandler } from "./lib/error/errorHandler";
import { UnhandledErrors } from "./lib/error/unhandledErrors";
import { createSentry } from './lib/config/sentry';
import helmet from 'helmet';
// import { loggerHttp } from "./lib/logger/logger";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

createSentry(app)

// app.use(loggerHttp) // If you want to use pino-http, you can use this middleware
app.use(helmet())
app.use(router)
app.use(errorHandler)

UnhandledErrors();
