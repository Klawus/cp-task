import "mocha";
import { use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { DataSource, ObjectLiteral, Repository } from "typeorm";
import "express-async-errors";
import { createContainer } from "../container";
import { config } from "../config/db";
import "express-async-errors";
import { CharacterEntity } from "../app/infra/database/entities/character.entity";
import { EpisodeEntity } from "../app/infra/database/entities/episode.entity";
import {
  ARRAY_OF_EXISTING_CHARACTERS,
  ARRAY_OF_EXISTING_EPISODES,
} from "./default-data";

use(chaiAsPromised);

const insertDefaultRecord = async (
  repository: Repository<ObjectLiteral>,
  tableName: string,
) => {
  if (tableName === "characters") {
    await Promise.all(
      ARRAY_OF_EXISTING_CHARACTERS.map(async (it) => {
        await repository.insert(CharacterEntity.toEntity(it));
      }),
    );
  }
  if (tableName === "episodes") {
    await Promise.all(
      ARRAY_OF_EXISTING_EPISODES.map(async (it) => {
        await repository.insert(EpisodeEntity.toEntity(it));
      }),
    );
  }
};

const clearDb = async (dataSource: DataSource) => {
  const entities = dataSource.entityMetadatas;

  await Promise.all(
    entities.map(async (entity) => {
      const repository = dataSource.getRepository(entity.name);

      await repository.query(
        `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`,
      );

      await insertDefaultRecord(repository, entity.tableName);
    }),
  );
};

before(async () => {
  const dbConnection = await new DataSource({
    ...config,
    logging: false,
  }).initialize();

  global.dbConnection = dbConnection;
  await dbConnection.dropDatabase();

  global.container = await createContainer();
});

beforeEach(async () => {
  if (global.dbConnection) {
    await clearDb(global.dbConnection);
  }
});

after(async () => {
  if (global.dbConnection) {
    await global.dbConnection.destroy();
  }
});
