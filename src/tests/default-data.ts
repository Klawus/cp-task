import { UUID } from "../shared/value-objects/uuid";
import { Character } from "../domain/character";
import { Episode } from "../domain/episode";

export const NOT_EXISTING_UUID = new UUID(
  "e37f2cc1-dcd4-407a-9635-5d5de870cc09",
);

export const DEFAULT_CHARACTER_INPUT = {
  name: "Andrew Input",
  episodeIds: [],
};

export const DEFAULT_EPISODE_INPUT = {
  name: "Test Episode",
};

export const EXISTING_CHARACTER = new Character({
  id: new UUID("b2d29e6a-2fec-4577-bb5c-059d92e2e444"),
  name: "Andrew",
});

export const EXISTING_EPISODE = new Episode({
  id: new UUID("dcf21edf-e7c2-496e-88a7-ae5922f3a8ae"),
  name: "Best Episode Ever",
});

export const ARRAY_OF_EXISTING_CHARACTERS = [
  EXISTING_CHARACTER,
  new Character({
    id: new UUID("facc0254-7a6b-4a60-9067-1406c61e734a"),
    name: "Test 1 Character",
  }),
  new Character({
    id: new UUID("4cbc05b3-8e98-4a62-a3c9-e04f7aa61de4"),
    name: "Test 2 Character",
  }),
  new Character({
    id: new UUID("dac81d07-d6e5-4d31-8e81-11a60fdf07f9"),
    name: "Test 3 Character",
  }),
  new Character({
    id: new UUID("d80f95f9-72c6-4a36-b417-7edb075b63ac"),
    name: "Test 4 Character",
  }),
  new Character({
    id: new UUID("4c395f84-754b-4e73-8062-15d4bce78b91"),
    name: "Test 5 Character",
  }),
];

export const ARRAY_OF_EXISTING_EPISODES = [
  EXISTING_EPISODE,
  new Episode({
    id: new UUID("e7cbebec-d3f0-4ed5-be72-0a9b9dbebfaf"),
    name: "Test 1 Episode",
  }),
  new Episode({
    id: new UUID("d1367c60-d785-4f36-a2ba-5788eb5446f8"),
    name: "Test 2 Episode",
  }),
  new Episode({
    id: new UUID("8307b5c0-c649-4741-9479-d263666614c8"),
    name: "Test 3 Episode",
  }),
  new Episode({
    id: new UUID("76978ff3-7d18-4ebd-96ca-88b20e4acbb5"),
    name: "Test 4 Episode",
  }),
  new Episode({
    id: new UUID("87ddb808-85ac-49a8-9fa6-fbc0308faabe"),
    name: "Test 5 Episode",
  }),
];
