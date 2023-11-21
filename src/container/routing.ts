import { AwilixContainer, asFunction } from "awilix";
import { episodesRouting } from "../app/routes/episodes.route";
import { charactersRouting } from "../app/routes/characters.route";

export async function registerRouting(container: AwilixContainer) {
  container.register({
    charactersRouting: asFunction(charactersRouting),
    episodesRouting: asFunction(episodesRouting),
  });

  return container;
}
