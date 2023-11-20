import { UpdateCharacterInput } from ".";

export const good: UpdateCharacterInput = {
  params: {
    id: "11b36b0c-8724-11ee-b9d1-0242ac120002",
  },
  body: {
    name: "Andrzej",
    episodeIds: ["11b36b0c-8724-11ee-b9d1-0242ac120002"],
  },
};

export const bad = {
  params: {
    name: "Andrzej",
  },
  body: {
    id: "11b36b0c-8724-11ee-b9d1-0242ac120002",
  },
};
