import { AwilixContainer, asClass, asValue } from "awilix";
import { Logger } from "winston";
import { TypeORMCharacterReadRepository } from "../app/infra/adapters/character-read.repository";
import { TypeORMCharacterWriteRepository } from "../app/infra/adapters/character-write.repository";
import { ContainerDependencies } from "../container";
import { dataSource } from "../config/db";

export async function registerDatabase(
  container: AwilixContainer,
  dependencies?: ContainerDependencies,
) {
  await dataSource.initialize();
  const dbDataSource = dependencies?.dbDataSource || dataSource;

  try {
    await dbDataSource.runMigrations();
  } catch (err) {
    (container.cradle.logger as Logger).debug(`Migrations: ${err}`);
    throw err;
  }
  container.register({
    dbDataSource: asValue(dbDataSource),
    entityManager: asValue(dbDataSource.manager),
    characterReadRepository: asClass(TypeORMCharacterReadRepository),
    characterWriteRepository: asClass(TypeORMCharacterWriteRepository),
  });
}
