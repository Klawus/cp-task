import { z } from "zod";
import { uuid } from "../../../uuid";

export const DELETE_CHARACTER_SCHEMA = z.object({
  params: z.strictObject({
    id: uuid(),
  }),
});

export type DeleteCharacterInputTransformed = z.output<
  typeof DELETE_CHARACTER_SCHEMA
>;
export type DeleteCharacterInput = z.input<typeof DELETE_CHARACTER_SCHEMA>;
