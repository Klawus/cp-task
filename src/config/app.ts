import { z } from "zod";
import { parseInputAgainstSchema } from "../tools/parse-against-schema";
import { loadEnvs } from "./env";

loadEnvs();

const schema = z.object({
  port: z.number().default(2000),
});

export const loadConfig = () => parseInputAgainstSchema(schema, process.env);

export type AppConfig = z.infer<typeof schema>;
