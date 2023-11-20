import { CreateCharacterInput } from ".";

export const good: CreateCharacterInput["body"] = {
  name: "Luke Skywalker",
};

export const bad = {
  name: 123,
  surname: "Skywalker",
};
