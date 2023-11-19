import { AwilixContainer, asFunction, asValue } from "awilix";
import { createLogger, transports } from "winston";
import { createRouter } from "../app/router";
import { AppConfig } from "../config/app";
import { errorHandler } from "../tools/error-handler";

export function registerCommonDependencies(
  container: AwilixContainer,
  appConfig: AppConfig,
) {
  const logger = createLogger({
    level: "debug",
    transports: [new transports.Console()],
  });

  container.register({
    logger: asValue(logger),
    port: asValue(appConfig.port),
    appConfig: asValue(appConfig),
    router: asFunction(createRouter).singleton(),
    errorHandler: asFunction(errorHandler),
  });

  return container;
}
