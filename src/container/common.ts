import { AwilixContainer, asClass, asFunction, asValue } from "awilix";
import { createLogger, transports } from "winston";
import { createRouter } from "../app/router";
import { AppConfig } from "../config/app";
import { errorHandler } from "../tools/error-handler";
import { UseCaseBus } from "../tools/use-case-bus";

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
    useCaseBus: asClass(UseCaseBus).classic().singleton(),
    errorHandler: asFunction(errorHandler),
  });

  return container;
}
