import { z } from "zod";
import { uuid } from "../../../uuid";

export const UPDATE_CHARACTER_SCHEMA = z.object({
  params: z.strictObject({
    id: uuid(),
  }),
  body: z.strictObject({
    name: z.string(),
  }),
});

export type UpdateCharacterInputTransformed = z.output<
  typeof UPDATE_CHARACTER_SCHEMA
>;
export type UpdateCharacterInput = z.input<typeof UPDATE_CHARACTER_SCHEMA>;
