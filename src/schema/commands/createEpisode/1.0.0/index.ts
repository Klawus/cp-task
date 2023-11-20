import { z } from "zod";

export const CREATE_EPISODE_SCHEMA = z.object({
  body: z.strictObject({
    name: z.string(),
  }),
});

export type CreateEpisodeInputTransformed = z.output<
  typeof CREATE_EPISODE_SCHEMA
>;
export type CreateEpisodeInput = z.input<typeof CREATE_EPISODE_SCHEMA>;
