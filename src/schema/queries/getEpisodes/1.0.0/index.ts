import { z } from "zod";
import { PAGE_REQUEST_SCHEMA } from "../../../../shared/pagination/pagination";

export const GET_EPISODES_SCHEMA = z.object({
  query: PAGE_REQUEST_SCHEMA,
});

export type GetEpisodesInputTransformed = z.output<typeof GET_EPISODES_SCHEMA>;
export type GetEpisodesInput = z.input<typeof GET_EPISODES_SCHEMA>;
