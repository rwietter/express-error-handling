import * as Sentry from "@sentry/node";
import type { Express } from "express";

const integrations = (app: Express) => {
  return [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.RequestData(),
    new Sentry.Integrations.Express({ app }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    // new Tracing.Integrations.Prisma({ client: Prisma }),
  ];
};

export const createSentry = (app: Express) => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
    integrations: [...integrations(app)],
  });

  // Trace incoming requests
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.use(Sentry.Handlers.errorHandler());
};
