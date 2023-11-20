import { CreateCharacterInput } from ".";

export const good: CreateCharacterInput["body"] = {
  name: "Luke Skywalker",
  episodeIds: ["11b36b0c-8724-11ee-b9d1-0242ac120002"],
};

export const bad = {
  name: 123,
  surname: "Skywalker",
};
