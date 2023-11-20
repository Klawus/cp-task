import { z } from "zod";
import { uuid } from "../../../uuid";

export const DELETE_EPISODE_SCHEMA = z.object({
  params: z.strictObject({
    id: uuid(),
  }),
});

export type DeleteEpisodeInputTransformed = z.output<
  typeof DELETE_EPISODE_SCHEMA
>;
export type DeleteEpisodeInput = z.input<typeof DELETE_EPISODE_SCHEMA>;
