import { z } from "zod";
import { PAGE_REQUEST_SCHEMA } from "../../../../shared/pagination/pagination";

export const GET_CHARACTERS_SCHEMA = z.object({
  query: PAGE_REQUEST_SCHEMA.extend({
    query: z.string().optional(),
  }),
});

export type GetCharactersInputTransformed = z.output<
  typeof GET_CHARACTERS_SCHEMA
>;
export type GetCharactersInput = z.input<typeof GET_CHARACTERS_SCHEMA>;
