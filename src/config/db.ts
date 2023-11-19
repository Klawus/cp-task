import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { DataSource } from "typeorm";
import z from "zod";
import { parseInputAgainstSchema } from "../tools/parse-against-schema";

const schema = z.object({
  type: z.literal("postgres"),
  host: z.string().default("localhost"),
  port: z.number().default(5432),
  database: z.string().default("postgres"),
  username: z.string().default("postgres"),
  password: z.string().default("password"),
  synchronize: z.boolean().default(false),
  logging: z.boolean().default(false),
  entities: z.array(z.string()),
  migrations: z.array(z.string()),
  namingStrategy: z.instanceof(SnakeNamingStrategy),
});

const loadDbConfig = () => ({
  type: "postgres",
  host: process.env.RDS_HOSTNAME,
  port: Number(process.env.RDS_PORT),
  database: process.env.RDS_DB_NAME,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  synchronize: false,
  logging: true,
  entities: ["/app/build/src/app/**/*.entity.js"],
  migrations: ["/app/build/src/migrations/*"],
  namingStrategy: new SnakeNamingStrategy(),
});

const loadAndParseDbConfig = () =>
  parseInputAgainstSchema(schema, loadDbConfig());

export const config = loadAndParseDbConfig();

export const dataSource = new DataSource(config);
