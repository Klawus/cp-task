import { z } from "zod";

export const CREATE_CHARACTER_SCHEMA = z.object({
  body: z.strictObject({
    name: z.string(),
  }),
});

export type CreateCharacterInputTransformed = z.output<
  typeof CREATE_CHARACTER_SCHEMA
>;
export type CreateCharacterInput = z.input<typeof CREATE_CHARACTER_SCHEMA>;
