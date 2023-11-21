import { GetCharactersInput } from ".";

export const good: GetCharactersInput["query"] = {
  limit: 5,
  offset: 0,
};

export const bad = {
  test: "test",
};
