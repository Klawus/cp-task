import { AwilixContainer, asClass } from "awilix";
import { asArray } from "../tools/as-array";
import { CreateCharacterUseCaseHandler } from "../app/use-cases/create-character/handler";
import { GetCharacterUseCaseHandler } from "../app/use-cases/get-character/handler";
import { GetCharactersUseCaseHandler } from "../app/use-cases/get-characters/handler";

export function registerCommandHandlers(container: AwilixContainer) {
  container.register({
    useCaseHandlers: asArray<any>([
      asClass(CreateCharacterUseCaseHandler),
      asClass(GetCharacterUseCaseHandler),
      asClass(GetCharactersUseCaseHandler),
    ]),
  });

  return container;
}
