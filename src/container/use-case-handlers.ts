import { AwilixContainer, asClass } from "awilix";
import { asArray } from "../shared/functions/as-array";
import { CreateCharacterUseCaseHandler } from "../app/use-cases/create-character/handler";
import { GetCharacterUseCaseHandler } from "../app/use-cases/get-character/handler";
import { GetCharactersUseCaseHandler } from "../app/use-cases/get-characters/handler";
import { DeleteCharacterUseCaseHandler } from "../app/use-cases/delete-character/handler";
import { CreateEpisodeUseCaseHandler } from "../app/use-cases/create-episode/handler";
import { DeleteEpisodeUseCaseHandler } from "../app/use-cases/delete-episode/handler";
import { UpdateCharacterUseCaseHandler } from "../app/use-cases/update-character/handler";

export function registerCommandHandlers(container: AwilixContainer) {
  container.register({
    useCaseHandlers: asArray<any>([
      asClass(CreateCharacterUseCaseHandler),
      asClass(UpdateCharacterUseCaseHandler),
      asClass(DeleteCharacterUseCaseHandler),
      asClass(GetCharacterUseCaseHandler),
      asClass(GetCharactersUseCaseHandler),
      asClass(CreateEpisodeUseCaseHandler),
      asClass(DeleteEpisodeUseCaseHandler),
    ]),
  });

  return container;
}
