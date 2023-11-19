import {
  createContainer as createAwilixContainer,
  AwilixContainer,
  InjectionMode,
  asFunction,
  asValue,
} from "awilix";
import http from "http";
import { AppConfig, loadConfig } from "./config/app";
import { createApp } from "./app/app";
import { registerCommonDependencies } from "./container/common";

export interface ContainerDependencies {
  appConfig?: AppConfig;
}

export async function createContainer(
  dependencies?: ContainerDependencies,
): Promise<AwilixContainer> {
  const appConfig = dependencies?.appConfig
    ? dependencies.appConfig
    : loadConfig();

  const container: AwilixContainer = createAwilixContainer({
    injectionMode: InjectionMode.PROXY,
  });

  registerCommonDependencies(container, appConfig);

  container.register({
    app: asFunction(createApp).singleton(),
  });

  const { app } = container.cradle;

  container.register({
    server: asValue(http.createServer(await app)),
  });

  return container;
}
