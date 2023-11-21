import { GetEpisodesInput } from ".";

export const good: GetEpisodesInput["query"] = {
  limit: 5,
  offset: 0,
};

export const bad = {
  test: "test",
};
