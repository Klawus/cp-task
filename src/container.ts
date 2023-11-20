import {
  createContainer as createAwilixContainer,
  AwilixContainer,
  InjectionMode,
  asFunction,
  asValue,
} from "awilix";
import http from "http";
import { DataSource } from "typeorm";
import { AppConfig, loadAndParseConfig } from "./config/app";
import { createApp } from "./app/app";
import { registerCommonDependencies } from "./container/common";
import { registerDatabase } from "./container/database";
import { registerCommandHandlers } from "./container/use-case-handlers";

export interface ContainerDependencies {
  appConfig?: AppConfig;
  dbDataSource?: DataSource;
}

export async function createContainer(
  dependencies?: ContainerDependencies,
): Promise<AwilixContainer> {
  const appConfig = dependencies?.appConfig
    ? dependencies.appConfig
    : loadAndParseConfig();

  const container: AwilixContainer = createAwilixContainer({
    injectionMode: InjectionMode.PROXY,
  });

  registerCommonDependencies(container, appConfig);
  registerCommandHandlers(container);
  await registerDatabase(container, dependencies);

  container.register({
    app: asFunction(createApp).singleton(),
  });

  const { app } = container.cradle;

  container.register({
    server: asValue(http.createServer(await app)),
  });

  return container;
}
