import { CreateEpisodeInput } from ".";

export const good: CreateEpisodeInput["body"] = {
  name: "Great Episode",
};

export const bad = {
  name: 123,
  surname: "Great Episode",
};
