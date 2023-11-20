import { AwilixContainer, asClass, asValue } from "awilix";
import { Logger } from "winston";
import { ContainerDependencies } from "../container";
import { dataSource } from "../config/db";
import { TypeORMCharacterReadRepository } from "../app/infra/adapters/character-read.repository";
import { TypeORMCharacterWriteRepository } from "../app/infra/adapters/character-write.repository";
import { TypeORMEpisodeReadRepository } from "../app/infra/adapters/episode-read.repository";
import { TypeORMEpisodeWriteRepository } from "../app/infra/adapters/episode-write.repository";

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
    episodeReadRepository: asClass(TypeORMEpisodeReadRepository),
    episodeWriteRepository: asClass(TypeORMEpisodeWriteRepository),
  });
}
