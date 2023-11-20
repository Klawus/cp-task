import { z } from "zod";
import { PAGE_REQUEST_SCHEMA } from "../../../../tools/pagination";

export const GET_CHARACTERS_SCHEMA = z.object({
  query: PAGE_REQUEST_SCHEMA.extend({
    query: z.string().optional(),
  }),
});

export type GetCharacterInputTransformed = z.output<
  typeof GET_CHARACTERS_SCHEMA
>;
export type GetCharacterInput = z.input<typeof GET_CHARACTERS_SCHEMA>;
