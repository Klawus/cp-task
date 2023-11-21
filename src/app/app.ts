import express from "express";
import helmet from "helmet";
import cors from "cors";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import { StatusCodes } from "http-status-codes";
import { MiddlewareType } from "../types";
import { multiFileSwagger } from "../tools/multi-file-swagger";
import { AppConfig } from "../config/app";
import { NotFoundError } from "../errors";

export interface AppDependencies {
  router: express.Router;
  errorHandler: MiddlewareType;
  appConfig: AppConfig;
}

async function createApp({ router, errorHandler }: AppDependencies) {
  const app = express();

  app.use(cors());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          scriptSrc: ["'self'", "https: 'unsafe-inline'"],
        },
      },
    }),
  );

  app.use(express.json());
  const swaggerDocument = await multiFileSwagger(
    YAML.load("../swagger/api.yaml"),
  );
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get("/health", (_req, res) => {
    res.status(StatusCodes.OK).json({
      status: "ok",
    });
  });

  app.use("/api", router);
  app.use("*", (_req, _res, next) => next(new NotFoundError()));
  app.use(errorHandler);

  return app;
}

export { createApp };
