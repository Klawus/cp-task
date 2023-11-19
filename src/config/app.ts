import { z } from "zod";
import { parseInputAgainstSchema } from "../tools/parse-against-schema";
import { loadEnvs } from "./env";

loadEnvs();

const loadConfig = () => ({
  port: Number(process.env.PORT),
});

const schema = z.object({
  port: z.number(),
});

export const loadAndParseConfig = () =>
  parseInputAgainstSchema(schema, loadConfig());

export type AppConfig = z.infer<typeof schema>;
