import { AwilixContainer } from "awilix";
import { DataSource } from "typeorm";

declare global {
  namespace NodeJS {
    interface Global {
      container: AwilixContainer;
      dbConnection: DataSource;
    }
  }

  var container: AwilixContainer;
  var dbConnection: DataSource;
}