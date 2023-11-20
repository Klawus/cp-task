import { z } from "zod";
import { uuid } from "../../../uuid";

export const GET_CHARACTER_SCHEMA = z.object({
  params: z.strictObject({
    id: uuid(),
  }),
});

export type GetCharacterInputTransformed = z.output<
  typeof GET_CHARACTER_SCHEMA
>;
export type GetCharacterInput = z.input<typeof GET_CHARACTER_SCHEMA>;
