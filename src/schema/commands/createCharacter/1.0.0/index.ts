import { z } from "zod";
import { uuid } from "../../../uuid";

export const CREATE_CHARACTER_SCHEMA = z.object({
  body: z.strictObject({
    name: z.string(),
    episodeIds: z
      .array(uuid())
      .optional()
      .transform((val) => val ?? []),
  }),
});

export type CreateCharacterInputTransformed = z.output<
  typeof CREATE_CHARACTER_SCHEMA
>;
export type CreateCharacterInput = z.input<typeof CREATE_CHARACTER_SCHEMA>;
